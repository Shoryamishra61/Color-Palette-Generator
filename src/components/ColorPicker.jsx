import React from 'react';
import styled from 'styled-components';
import { HexColorPicker } from 'react-colorful';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PickerContainer = styled(motion.div)`
  background: var(--cardBackground);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border);
  position: relative;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid var(--background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: var(--accent1);
  }

  svg {
    font-size: 12px;
  }
`;

const StyledColorPicker = styled(HexColorPicker)`
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 1 !important;
  margin-bottom: 0.5rem;

  .react-colorful__saturation {
    border-radius: 8px;
    border-bottom: none;
    margin-bottom: 8px;
  }

  .react-colorful__hue {
    height: 20px;
    border-radius: 8px;
  }

  .react-colorful__saturation-pointer,
  .react-colorful__hue-pointer {
    width: 16px;
    height: 16px;
    border-width: 2px;
    border-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ColorValue = styled.div`
  background: var(--background);
  color: var(--text);
  padding: 0.5rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid var(--border);
  margin-top: 0.5rem;
  font-weight: 500;
`;

const ColorPicker = ({ color, onChange, onRemove, index }) => {
  return (
    <PickerContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {index > 0 && (
        <RemoveButton onClick={onRemove} title="Remove color">
          <FaTimes />
        </RemoveButton>
      )}
      <StyledColorPicker color={color} onChange={onChange} />
      <ColorValue>{color.toUpperCase()}</ColorValue>
    </PickerContainer>
  );
};

export default ColorPicker; 