import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaCopy } from 'react-icons/fa';
import { getContrastColor } from '../utils/colorUtils';

const SwatchContainer = styled(motion.div)`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: ${props => props.color};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  min-width: 50px;
  max-width: 80px;
  margin: 0 auto;
  border: 2px solid ${props => props.theme.border};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const SwatchOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease;

  ${SwatchContainer}:hover & {
    opacity: 1;
  }
`;

const ColorValue = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px;
  font-size: 10px;
  font-family: monospace;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${SwatchContainer}:hover & {
    opacity: 1;
  }
`;

const IconButton = styled.button`
  background: ${props => props.contrastColor};
  color: ${props => props.color};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    font-size: 10px;
  }
`;

const ColorSwatch = ({ color, onClick, onInfoClick }) => {
  const contrastColor = getContrastColor(color);

  return (
    <SwatchContainer
      color={color}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SwatchOverlay>
        <IconButton
          onClick={e => {
            e.stopPropagation();
            onClick(color);
          }}
          color={color}
          contrastColor={contrastColor}
          title="Copy color"
        >
          <FaCopy />
        </IconButton>
        <IconButton
          onClick={e => {
            e.stopPropagation();
            onInfoClick(color);
          }}
          color={color}
          contrastColor={contrastColor}
          title="Color information"
        >
          <FaInfoCircle />
        </IconButton>
      </SwatchOverlay>
      <ColorValue>{color}</ColorValue>
    </SwatchContainer>
  );
};

export default ColorSwatch; 