import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTimes, FaPalette, FaInfoCircle, FaSwatchbook } from 'react-icons/fa';
import { getColorName, getContrastColor, hexToHSL } from '../utils/colorUtils';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Container = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  border: 1px solid ${props => props.theme.border};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ColorPreview = styled.div`
  width: 100%;
  height: 150px;
  background: ${props => props.color};
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  }
`;

const ColorName = styled.h2`
  color: ${props => props.theme.primary};
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const ColorValue = styled.div`
  background: ${props => props.theme.background};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: monospace;
  font-size: 1.1rem;
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const InfoCard = styled.div`
  background: ${props => props.theme.background};
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  svg {
    color: ${props => props.theme.accent1};
    font-size: 1.2rem;
    margin-top: 0.2rem;
  }
`;

const InfoContent = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: ${props => props.theme.primary};
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${props => props.theme.secondary};
    line-height: 1.4;
  }
`;

const ColorInfo = ({ color, onClose }) => {
  const [colorInfo, setColorInfo] = useState({
    name: '',
    contrast: '',
    usage: '',
    harmony: '',
    personality: ''
  });

  useEffect(() => {
    const name = getColorName(color);
    const contrast = getContrastColor(color);
    const hsl = hexToHSL(color);
    
    setColorInfo({
      name,
      contrast,
      usage: getColorUsage(name.toLowerCase(), hsl),
      harmony: getColorHarmony(name.toLowerCase(), hsl),
      personality: getColorPersonality(name.toLowerCase(), hsl)
    });
  }, [color]);

  const getColorUsage = (name, hsl) => {
    const baseColor = name.split(' ')[0].toLowerCase();
    const { l: lightness } = hsl;
    
    const usages = {
      red: {
        light: "Perfect for highlighting important actions, creating energy in designs, or adding warmth to interfaces.",
        medium: "Ideal for call-to-action buttons, error states, or creating emphasis in design.",
        dark: "Excellent for creating depth, dramatic accents, or sophisticated warning indicators."
      },
      blue: {
        light: "Great for creating a trustworthy, calm atmosphere in backgrounds or secondary elements.",
        medium: "Perfect for corporate designs, links, and primary interface elements.",
        dark: "Ideal for professional applications, headers, or creating depth in designs."
      },
      green: {
        light: "Excellent for success messages, eco-friendly themes, or subtle natural elements.",
        medium: "Perfect for positive actions, environmental themes, or balanced design elements.",
        dark: "Great for creating rich, natural atmospheres or sophisticated environmental branding."
      },
      yellow: {
        light: "Ideal for highlighting information, creating cheerful accents, or warning states.",
        medium: "Perfect for drawing attention, creating energy, or adding warmth to designs.",
        dark: "Great for creating rich, golden accents or sophisticated warning indicators."
      },
      purple: {
        light: "Perfect for feminine designs, spiritual themes, or creative accents.",
        medium: "Ideal for luxury branding, creative applications, or mystical themes.",
        dark: "Excellent for royal themes, high-end products, or dramatic creative elements."
      },
      orange: {
        light: "Great for friendly, approachable interfaces or subtle energy in designs.",
        medium: "Perfect for calls-to-action, creative energy, or playful elements.",
        dark: "Ideal for autumn themes, warm accents, or sophisticated energy."
      },
      pink: {
        light: "Perfect for feminine designs, gentle notifications, or playful accents.",
        medium: "Ideal for fashion applications, romantic themes, or energetic highlights.",
        dark: "Great for dramatic feminine elements or sophisticated fashion designs."
      },
      brown: {
        light: "Ideal for natural themes, earthy backgrounds, or subtle warmth.",
        medium: "Perfect for rustic designs, organic themes, or grounded elements.",
        dark: "Excellent for rich, sophisticated designs or natural luxury elements."
      },
      gray: {
        light: "Perfect for subtle backgrounds, modern interfaces, or neutral design elements.",
        medium: "Ideal for professional text, balanced designs, or sophisticated interfaces.",
        dark: "Great for strong contrast, elegant designs, or professional applications."
      },
      black: "Perfect for text, creating strong contrast, or sophisticated design elements.",
      white: "Ideal for backgrounds, creating clean spaces, or modern minimal designs."
    };

    const getLightnessCategory = (l) => {
      if (l > 70) return 'light';
      if (l > 40) return 'medium';
      return 'dark';
    };

    const colorUsage = usages[baseColor];
    if (!colorUsage) return "This color can be used effectively as an accent or primary color in your design.";
    
    return typeof colorUsage === 'string' 
      ? colorUsage 
      : colorUsage[getLightnessCategory(lightness)];
  };

  const getColorHarmony = (name, hsl) => {
    const baseColor = name.split(' ')[0].toLowerCase();
    const { h: hue, s: saturation, l: lightness } = hsl;
    
    const harmonies = {
      red: {
        light: "Pairs beautifully with navy blue, charcoal gray, or soft cream accents.",
        medium: "Works well with pure white, deep blues, or neutral grays.",
        dark: "Harmonizes with light grays, white, or deep navy for contrast."
      },
      blue: {
        light: "Complements warm oranges, soft grays, or deeper blues.",
        medium: "Pairs well with white, light grays, or coral accents.",
        dark: "Works great with light neutrals, warm oranges, or gold accents."
      },
      green: {
        light: "Harmonizes with deeper greens, warm browns, or soft purples.",
        medium: "Pairs well with wood tones, neutral grays, or complementary pinks.",
        dark: "Works beautifully with light neutrals, gold, or coral accents."
      },
      yellow: {
        light: "Complements navy blue, charcoal gray, or deep purples.",
        medium: "Works well with dark blues, neutral grays, or rich purples.",
        dark: "Pairs beautifully with cool grays, deep blues, or white."
      },
      purple: {
        light: "Harmonizes with gold accents, neutral grays, or deeper purples.",
        medium: "Pairs well with silver, light neutrals, or yellow accents.",
        dark: "Works great with light grays, gold, or soft yellows."
      },
      orange: {
        light: "Complements navy blue, cool grays, or deeper oranges.",
        medium: "Works well with deep blues, neutral grays, or teal accents.",
        dark: "Pairs beautifully with light blues, white, or cool grays."
      },
      pink: {
        light: "Harmonizes with gray-blues, soft neutrals, or deeper pinks.",
        medium: "Pairs well with cool grays, navy, or gold accents.",
        dark: "Works beautifully with light neutrals, silver, or sage green."
      },
      brown: {
        light: "Complements deeper browns, navy blue, or sage green.",
        medium: "Works well with cream, light blues, or warm grays.",
        dark: "Pairs beautifully with light neutrals, soft blues, or sage."
      },
      gray: {
        light: "Versatile base that works with any bold or bright accent color.",
        medium: "Pairs well with both light and dark shades, perfect for any accent.",
        dark: "Creates beautiful contrast with bright or light accent colors."
      }
    };

    const getLightnessCategory = (l) => {
      if (l > 70) return 'light';
      if (l > 40) return 'medium';
      return 'dark';
    };

    const colorHarmony = harmonies[baseColor];
    if (!colorHarmony) {
      if (saturation < 10) {
        return "As a neutral color, it pairs well with any other colors, especially as a background or accent.";
      }
      return "This color can be combined with complementary or analogous colors for harmony.";
    }
    
    return colorHarmony[getLightnessCategory(lightness)];
  };

  const getColorPersonality = (name, hsl) => {
    const baseColor = name.split(' ')[0].toLowerCase();
    const { s: saturation, l: lightness } = hsl;

    const personalities = {
      red: {
        light: "Energetic and friendly, radiating warmth and approachability.",
        medium: "Passionate and bold, commanding attention and excitement.",
        dark: "Powerful and sophisticated, suggesting luxury and intensity."
      },
      blue: {
        light: "Serene and trustworthy, promoting peace and clarity.",
        medium: "Professional and reliable, inspiring confidence and stability.",
        dark: "Deep and authoritative, conveying wisdom and excellence."
      },
      green: {
        light: "Fresh and peaceful, suggesting growth and vitality.",
        medium: "Natural and balanced, promoting harmony and health.",
        dark: "Rich and established, conveying prosperity and tradition."
      },
      yellow: {
        light: "Cheerful and optimistic, radiating happiness and energy.",
        medium: "Dynamic and attention-grabbing, promoting creativity.",
        dark: "Sophisticated and warm, suggesting wisdom and comfort."
      },
      purple: {
        light: "Romantic and mystical, suggesting creativity and spirituality.",
        medium: "Creative and luxurious, conveying royalty and imagination.",
        dark: "Mysterious and powerful, suggesting luxury and sophistication."
      },
      orange: {
        light: "Friendly and inviting, radiating warmth and accessibility.",
        medium: "Energetic and adventurous, promoting enthusiasm.",
        dark: "Rich and confident, suggesting comfort and security."
      },
      pink: {
        light: "Sweet and gentle, radiating youth and innocence.",
        medium: "Playful and romantic, promoting energy and emotion.",
        dark: "Sophisticated and passionate, suggesting luxury and drama."
      },
      brown: {
        light: "Warm and natural, suggesting comfort and reliability.",
        medium: "Earthy and grounded, promoting stability and tradition.",
        dark: "Rich and sophisticated, conveying luxury and strength."
      },
      gray: {
        light: "Clean and modern, suggesting efficiency and clarity.",
        medium: "Professional and balanced, promoting neutrality.",
        dark: "Sophisticated and strong, conveying authority and elegance."
      }
    };

    const getLightnessCategory = (l) => {
      if (l > 70) return 'light';
      if (l > 40) return 'medium';
      return 'dark';
    };

    const colorPersonality = personalities[baseColor];
    if (!colorPersonality) {
      if (saturation < 10) {
        if (lightness > 90) return "Pure and minimal, creating space and clarity.";
        if (lightness < 10) return "Bold and definitive, conveying power and elegance.";
        return "Neutral and balanced, providing structure and sophistication.";
      }
      return "Unique and distinctive, adding character to the design.";
    }
    
    return colorPersonality[getLightnessCategory(lightness)];
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Container
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>

        <ColorPreview color={color} />
        <ColorName>{colorInfo.name}</ColorName>
        <ColorValue>
          <span>{color}</span>
          <span>Contrast: {colorInfo.contrast}</span>
        </ColorValue>

        <InfoGrid>
          <InfoCard>
            <FaPalette />
            <InfoContent>
              <h3>Usage & Meaning</h3>
              <p>{colorInfo.usage}</p>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <FaSwatchbook />
            <InfoContent>
              <h3>Color Harmony</h3>
              <p>{colorInfo.harmony}</p>
            </InfoContent>
          </InfoCard>
        </InfoGrid>
      </Container>
    </Overlay>
  );
};

export default ColorInfo; 