import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const PickerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  cursor: crosshair;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
`;

const ColorPreview = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: all 0.1s ease;
`;

const ColorInfo = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: all 0.1s ease;
`;

const ScreenColorPicker = ({ onPick, onClose }) => {
  const [color, setColor] = useState('#000000');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = document.createElement('video');

    const handleSuccess = (stream) => {
      video.srcObject = stream;
      video.play();
    };

    const handleError = (error) => {
      console.error('Error accessing screen:', error);
    };

    navigator.mediaDevices.getDisplayMedia({ video: true })
      .then(handleSuccess)
      .catch(handleError);

    const updateColor = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x: e.clientX, y: e.clientY });

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
      setColor(hexColor);
    };

    const handleClick = (e) => {
      onPick(color);
      onClose();
    };

    canvas.addEventListener('mousemove', updateColor);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('mousemove', updateColor);
      canvas.removeEventListener('click', handleClick);
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [onPick, onClose, color]);

  return (
    <PickerContainer>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ display: 'none' }}
      />
      <ColorPreview
        style={{
          left: position.x,
          top: position.y,
          backgroundColor: color,
        }}
      />
      <ColorInfo
        style={{
          left: position.x,
          top: position.y + 60,
        }}
      >
        {color}
      </ColorInfo>
    </PickerContainer>
  );
};

export default ScreenColorPicker; 