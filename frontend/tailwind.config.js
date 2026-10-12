/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saudi: {
          50: '#eefcf3',
          100: '#d7f7e2',
          200: '#b2edc7',
          500: '#1b9b52',
          600: '#008744',
          700: '#006C35', // Authentic Saudi Green
          800: '#00552b',
          900: '#004020',
          950: '#002513',
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'Cairo', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
