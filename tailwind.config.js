/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'form': ['0 10px 8px rgb(156,39,176/0.04)', '0 4px 3px rgb(156,39,176/0.04)']
      },
      fontFamily: {
        'varela': ['Varela Round', 'sans-serif']
      }
    },
  },
  plugins: [],
}

