const withMT = require('@material-tailwind/react/utils/withMT');

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        zoomIn: 'zoomIn 20s infinite',
      },
      keyframes: {
        zoomIn: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      fontFamily: {
        heading: ['Arial', 'sans-serif'],
        body: ['Arial', 'sans-serif'],
        norican: ['Arial', 'cursive'],
        poiret: ['Arial', 'cursive'],
        croissant: ['Arial', 'cursive'],
        merienda: ['Arial', 'cursive'],
      },
      colors: {
        whimsipink: '#F4E3ED',
        whimsidarkblue: '#101A4B',
        whimsihotpink: '#DE369D',
        whimsilightblue: '#7B8CDE',
        whimsiorange: '#F9A03F',
      },
      backgroundColor: {
        papercolor: '#faf4e3',
      },
    },
  },
  plugins: [],
});
