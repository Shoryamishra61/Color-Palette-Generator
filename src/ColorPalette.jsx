import React, { useState } from 'react';
import styled from 'styled-components';

const ColorPaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ColorInput = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ColorPalette = () => {
  const [color, setColor] = useState('#ffffff');
  const [palette, setPalette] = useState([]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    setPalette([...palette, newColor]);
  };

  const handleRemoveColor = (index) => {
    setPalette(palette.filter((_, i) => i !== index));
  };

  return (
    <ColorPaletteContainer>
      <ColorInput type="color" value={color} onChange={handleColorChange} />
      <ul>
        {palette.map((color, index) => (
          <li key={index}>
            <div
              style={{
                backgroundColor: color,
                width: '50px',
                height: '50px',
                borderRadius: '50%',
              }}
            />
            <button onClick={() => handleRemoveColor(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </ColorPaletteContainer>
  );
};

export default ColorPalette;