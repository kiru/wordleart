module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '2rem',
          sm: '4rem',
          lg: '8rem',
          xl: '10rem',
          '2xl': '12rem',
        },
      },
    },
  },
  plugins: [],
}
