/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "var(--primary-color)",
        'primary-light': "var(--primary-light)",
        'light': "var(--light)"
      },
      screens: {
        'sm': '300px'
      },
      dropShadow: {
        'form': '5px 10px 5px rgba(0,0,0,0.8)',
          '3xl': '0px 10px 5px rgba(0,0,0,0.8)',
          '3xl-inverted': '0px -10px 5px rgba(0,0,0, 0.8)',
          'form-field': '0px 5px 5px rgba(0,0,0,0.5)'
      },
      fontFamily: {
        'varela': ["'Exo 2'", 'serif']
      }
    },
  },
  plugins: [],
}

