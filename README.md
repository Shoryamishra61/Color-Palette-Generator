# Color Palette Generator

A React-based web application that generates beautiful color palettes based on user-selected base colors. The application allows users to create harmonious color schemes and easily copy color values to their clipboard.

Visit my website : https://color-palette-generator-amber.vercel.app/

## Features

- Multiple color pickers for base colors
- Automatic generation of analogous color palettes
- Copy color values to clipboard with one click
- Responsive design for both desktop and mobile
- Visual feedback when copying colors
- Clean and intuitive user interface

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd color-palette-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Use the color pickers to select your base colors
2. Click the "+ Add Color" button to add more color pickers (up to 5)
3. The application will automatically generate palettes based on your selected colors
4. Click on any color swatch to copy its hex value to your clipboard
5. A notification will appear when a color is successfully copied

## Technologies Used

- React
- Vite
- react-colorful (color picker component)
- react-toastify (notifications)
- CSS3
