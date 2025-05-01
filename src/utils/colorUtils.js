const COLOR_NAMES = {
  '#FF0000': 'Red',
  '#00FF00': 'Green',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#FF00FF': 'Magenta',
  '#00FFFF': 'Cyan',
  '#000000': 'Black',
  '#FFFFFF': 'White',
  '#808080': 'Gray',
  '#800000': 'Maroon',
  '#808000': 'Olive',
  '#008000': 'Dark Green',
  '#800080': 'Purple',
  '#008080': 'Teal',
  '#000080': 'Navy',
  '#FFA500': 'Orange',
  '#FFC0CB': 'Pink',
  '#8B4513': 'Brown',
  '#4B0082': 'Indigo',
  '#FFD700': 'Gold'
};

// Helper functions
const hexToRGB = (hex) => {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  return { r, g, b };
};

const colorDistance = (rgb1, rgb2) => {
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
};

export const hexToHSL = (hex) => {
  const rgb = hexToRGB(hex);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }

    h /= 6;
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
};

const HSLToHex = (h, s, l) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
};

const generateAnalogous = (hsl, angle) => {
  let newHue = (hsl.h + angle) % 360;
  if (newHue < 0) newHue += 360;
  return HSLToHex(newHue, hsl.s, hsl.l);
};

const generateComplement = (hsl) => {
  const newHue = (hsl.h + 180) % 360;
  return HSLToHex(newHue, hsl.s, hsl.l);
};

const generateTriadic = (hsl, index) => {
  const newHue = (hsl.h + 120 * index) % 360;
  return HSLToHex(newHue, hsl.s, hsl.l);
};

export const isValidHexColor = (color) => {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(color);
};

export const generatePalette = (baseColor) => {
  const hsl = hexToHSL(baseColor);
  
  // Generate a harmonious palette
  return [
    baseColor,
    generateAnalogous(hsl, 30),
    generateAnalogous(hsl, -30),
    generateComplement(hsl),
    generateTriadic(hsl, 1),
  ].map(color => color.toUpperCase());
};

export const getContrastColor = (hexColor) => {
  const rgb = hexToRGB(hexColor);
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export const getColorName = (hexColor) => {
  // Convert to uppercase for consistency
  const color = hexColor.toUpperCase();
  
  // First check exact matches
  if (COLOR_NAMES[color]) {
    return COLOR_NAMES[color];
  }

  // If no exact match, find the closest color
  const rgb1 = hexToRGB(color);
  let minDistance = Infinity;
  let closestColorName = 'Custom Color';

  Object.entries(COLOR_NAMES).forEach(([hex, name]) => {
    const rgb2 = hexToRGB(hex);
    const distance = colorDistance(rgb1, rgb2);
    if (distance < minDistance) {
      minDistance = distance;
      closestColorName = name;
    }
  });

  // Add shade description
  const hsl = hexToHSL(color);
  let shade = '';
  if (hsl.l < 20) shade = 'Very Dark ';
  else if (hsl.l < 40) shade = 'Dark ';
  else if (hsl.l > 80) shade = 'Light ';
  else if (hsl.l > 60) shade = 'Soft ';

  return shade + closestColorName;
}; 