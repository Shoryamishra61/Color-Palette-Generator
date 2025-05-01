import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPalette, FaMagic } from 'react-icons/fa';

const Container = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: ${props => props.theme.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const MoodCard = styled(motion.div)`
  background: ${props => props.theme.background};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ColorStrip = styled.div`
  display: flex;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ColorBlock = styled.div`
  flex: 1;
  background: ${props => props.color};
`;

const MoodName = styled.h3`
  color: ${props => props.theme.text};
  margin: 0.5rem 0;
  font-size: 0.9rem;
  text-align: center;
`;

const moodPalettes = {
  'Calm & Serene': ['#E6F3FF', '#B3D9FF', '#80BFFF', '#4DA6FF', '#1A8CFF'],
  'Warm & Cozy': ['#FFF5E6', '#FFE6CC', '#FFD6B3', '#FFC699', '#FFB680'],
  'Energetic': ['#FFE6E6', '#FFB3B3', '#FF8080', '#FF4D4D', '#FF1A1A'],
  'Natural': ['#E6FFE6', '#B3FFB3', '#80FF80', '#4DFF4D', '#1AFF1A'],
  'Elegant': ['#F2F2F2', '#D9D9D9', '#BFBFBF', '#A6A6A6', '#8C8C8C'],
  'Vibrant': ['#FFE6FF', '#FFB3FF', '#FF80FF', '#FF4DFF', '#FF1AFF'],
  'Ocean': ['#E6F7FF', '#B3E6FF', '#80D4FF', '#4DC3FF', '#1AB2FF'],
  'Sunset': ['#FFE6CC', '#FFCC99', '#FFB366', '#FF9933', '#FF8000'],
  'Forest': ['#E6FFE6', '#B3FFB3', '#80FF80', '#4DFF4D', '#1AFF1A'],
  'Pastel': ['#FFE6FF', '#E6FFE6', '#E6E6FF', '#FFE6E6', '#E6FFE6'],
  'Minimal': ['#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC'],
  'Bold': ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
  'Autumn': ['#FFD700', '#FF8C00', '#FF4500', '#8B4513', '#4B0082'],
  'Spring': ['#FFB6C1', '#98FB98', '#87CEEB', '#FFD700', '#FF69B4'],
  'Summer': ['#00BFFF', '#FFD700', '#FF69B4', '#32CD32', '#FFA500'],
  'Winter': ['#E6E6FA', '#B0E0E6', '#87CEEB', '#4682B4', '#1E90FF'],
  'Neon': ['#FF00FF', '#00FFFF', '#FFFF00', '#FF00FF', '#00FF00'],
  'Vintage': ['#F5DEB3', '#D2B48C', '#DEB887', '#CD853F', '#D2691E'],
  'Modern': ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', '#BDC3C7'],
  'Retro': ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
  'Cyberpunk': ['#FF00FF', '#00FFFF', '#FF00FF', '#00FFFF', '#FF00FF'],
  'Nordic': ['#2E3440', '#3B4252', '#434C5E', '#4C566A', '#D8DEE9'],
  'Tropical': ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
  'Desert': ['#F4A460', '#DEB887', '#CD853F', '#D2691E', '#8B4513'],
  'Rainbow': ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']
};

const MoodPalettes = ({ onGeneratePalette }) => {
  const handlePaletteClick = (colors) => {
    onGeneratePalette(colors);
  };

  return (
    <Container>
      <Title>
        <FaPalette /> Mood & Aesthetic Palettes
      </Title>
      
      <MoodGrid>
        {Object.entries(moodPalettes).map(([mood, colors]) => (
          <MoodCard
            key={mood}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePaletteClick(colors)}
          >
            <ColorStrip>
              {colors.map((color, index) => (
                <ColorBlock key={index} color={color} />
              ))}
            </ColorStrip>
            <MoodName>{mood}</MoodName>
          </MoodCard>
        ))}
      </MoodGrid>
    </Container>
  );
};

export default MoodPalettes; 