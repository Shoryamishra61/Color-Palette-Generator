import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaTimes, FaPlus, FaEyeDropper, FaMoon, FaSun } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import ColorPicker from './components/ColorPicker';
import ColorSwatch from './components/ColorSwatch';
import ScreenColorPicker from './components/ScreenColorPicker';
import ColorInfo from './components/ColorInfo';
import SavedPalettes from './components/SavedPalettes';
import MoodPalettes from './components/MoodPalettes';
import { generatePalette, getContrastColor, isValidHexColor, getColorName } from './utils/colorUtils';
import { useTheme } from './context/ThemeContext';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 1.5rem;
  background: var(--background);
  color: var(--text);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled(motion.div)`
  width: min(100%, 1000px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  color: var(--primary);
  margin: 0 0 0.5rem 0;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, var(--accent1), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  color: var(--secondary);
  font-size: 1rem;
  line-height: 1.5;
  max-width: 500px;
  margin: 0 auto;
`;

const ColorPickersContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  margin: 0 0 1.5rem 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const PalettesContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
`;

const SwatchesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0.5rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const Button = styled(motion.button)`
  background: ${props => props.variant === 'primary' 
    ? `linear-gradient(135deg, ${props.theme.accent1}, ${props.theme.accent2})`
    : props.theme.cardBackground};
  color: ${props => props.variant === 'primary' ? '#fff' : props.theme.text};
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    font-size: 1rem;
  }
`;

const ThemeToggle = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
  padding: 0.5rem;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cardBackground);
  color: var(--text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const App = () => {
  const [baseColors, setBaseColors] = useState(['#6e8efb']);
  const [palettes, setPalettes] = useState([]);
  const [showScreenPicker, setShowScreenPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  const theme = {
    background: isDarkMode ? '#1a1a1a' : '#f8fafc',
    text: isDarkMode ? '#ffffff' : '#1a1a1a',
    primary: isDarkMode ? '#6e8efb' : '#2c3e50',
    secondary: isDarkMode ? '#a0a0a0' : '#64748b',
    accent1: isDarkMode ? '#6e8efb' : '#6e8efb',
    accent2: isDarkMode ? '#a777e3' : '#a777e3',
    cardBackground: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  useEffect(() => {
    try {
      const newPalettes = baseColors.map(color => generatePalette(color));
      setPalettes(newPalettes);
    } catch (error) {
      console.error('Error generating palettes:', error);
      toast.error('Error generating color palette');
    }
  }, [baseColors]);

  const handleColorChange = useCallback((index, newColor) => {
    if (!isValidHexColor(newColor)) {
      toast.error('Invalid color value');
      return;
    }

    setBaseColors(prevColors => {
      const newColors = [...prevColors];
      newColors[index] = newColor;
      return newColors;
    });
  }, []);

  const handleScreenPick = useCallback((color) => {
    if (baseColors.length >= 5) {
      toast.error('Maximum number of colors reached (5)');
      return;
    }
    setBaseColors(prevColors => [...prevColors, color]);
    setShowScreenPicker(false);
    toast.success('Color picked from screen!');
  }, [baseColors.length]);

  const addColorPicker = useCallback(() => {
    if (baseColors.length >= 5) {
      toast.error('Maximum number of colors reached (5)');
      return;
    }
    setBaseColors(prevColors => [...prevColors, '#000000']);
  }, [baseColors.length]);

  const removeColorPicker = useCallback((index) => {
    if (baseColors.length <= 1) {
      toast.error('Must have at least one color');
      return;
    }
    setBaseColors(prevColors => prevColors.filter((_, i) => i !== index));
  }, [baseColors.length]);

  const copyToClipboard = useCallback(async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      const colorName = await getColorName(color);
      toast.success(`Copied ${colorName} (${color}) to clipboard!`);
    } catch (err) {
      console.error('Failed to copy color:', err);
      toast.error('Failed to copy color');
    }
  }, []);

  const handleLoadPalette = useCallback((colors) => {
    if (!Array.isArray(colors) || colors.length === 0) {
      toast.error('Invalid palette data');
      return;
    }
    setBaseColors(colors);
    toast.success('Palette loaded successfully!');
  }, []);

  const handleGenerateMoodPalette = useCallback((colors) => {
    if (!Array.isArray(colors) || colors.length === 0) {
      toast.error('Invalid mood palette data');
      return;
    }
    setBaseColors(colors);
    toast.success('Mood palette generated!');
  }, []);

  return (
    <AppContainer>
      <ThemeToggle onClick={toggleTheme} variant="secondary">
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </ThemeToggle>
      
      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <Title>Color Palette Generator</Title>
          <Subtitle>Create beautiful color palettes with ease</Subtitle>
        </Header>

        <ColorPickersContainer>
          {baseColors.map((color, index) => (
            <ColorPicker
              key={index}
              color={color}
              onChange={color => handleColorChange(index, color)}
              onRemove={() => removeColorPicker(index)}
              index={index}
            />
          ))}
        </ColorPickersContainer>

        <ButtonContainer>
          <Button
            onClick={addColorPicker}
            disabled={baseColors.length >= 5}
            variant="secondary"
          >
            <FaPlus /> Add Color
          </Button>
          <Button
            onClick={() => setShowScreenPicker(true)}
            disabled={baseColors.length >= 5}
            variant="secondary"
          >
            <FaEyeDropper /> Pick from Screen
          </Button>
        </ButtonContainer>

        <PalettesContainer>
          {palettes.map((palette, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SwatchesContainer>
                {palette.map((color, colorIndex) => (
                  <ColorSwatch
                    key={colorIndex}
                    color={color}
                    onClick={() => copyToClipboard(color)}
                    onInfoClick={() => setSelectedColor(color)}
                  />
                ))}
              </SwatchesContainer>
            </motion.div>
          ))}
        </PalettesContainer>

        {showScreenPicker && (
          <ScreenColorPicker
            onPick={handleScreenPick}
            onClose={() => setShowScreenPicker(false)}
          />
        )}

        {selectedColor && (
          <ColorInfo
            color={selectedColor}
            onClose={() => setSelectedColor(null)}
          />
        )}

        <MoodPalettes onGeneratePalette={handleGenerateMoodPalette} />
        <SavedPalettes currentPalette={baseColors} onLoadPalette={handleLoadPalette} />
      </ContentWrapper>
    </AppContainer>
  );
};

export default App;
