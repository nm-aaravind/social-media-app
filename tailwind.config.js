/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
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
        'varela': ['Varela Round', 'sans-serif']
      }
    },
  },
  plugins: [],
}

