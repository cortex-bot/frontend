module.exports = {
  // mode:'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary:'#202225',
        secondary:'#5865f2',
        heading:'#f0ffff',
        subheading:'#999f9fcf',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
