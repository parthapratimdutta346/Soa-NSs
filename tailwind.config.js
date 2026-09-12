/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0b1329',
          navyDark: '#060a17',
          navyLight: '#16244f',
          accentBlue: '#2e5bff',
          nssRed: '#e63946',
          nssOrange: '#f35b04',
          nssYellow: '#f4a261',
          soaRose: '#e41b58',
          soaGreen: '#10b981',
          gold: '#fbbf24'
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(230, 57, 70, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(46, 91, 255, 0.6)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
