/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFAF6',
          100: '#FAF7F2',
          200: '#F5F0E8',
          300: '#EDE4D8',
          400: '#DDD3C7',
          500: '#C4B5A8',
        },
        warm: {
          dark: '#1E160E',
          brown: '#2C1810',
          medium: '#6B5A4E',
          muted: '#8C7B70',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#DBBE8A',
          deep: '#A07840',
        },
        terracotta: {
          DEFAULT: '#A05C3B',
          light: '#C47A58',
        },
      },
      fontFamily: {
        display: ['"Tenor Sans"', 'Georgia', 'sans-serif'],
        body: ['"DM Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1' }],
        'display-sm': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-xl': ['7rem', { lineHeight: '0.95', letterSpacing: '-0.05em' }],
        'display-2xl': ['9rem', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        42: '10.5rem',
        46: '11.5rem',
        50: '12.5rem',
        54: '13.5rem',
        58: '14.5rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(30, 22, 14, 0.08)',
        'warm-md': '0 4px 20px rgba(30, 22, 14, 0.12)',
        'warm-lg': '0 8px 40px rgba(30, 22, 14, 0.16)',
        'warm-xl': '0 16px 60px rgba(30, 22, 14, 0.22)',
        gold: '0 4px 20px rgba(201, 169, 110, 0.3)',
      },
      transitionTimingFunction: {
        emphasis: 'cubic-bezier(0.2, 0, 0, 1)',
        'menu-open': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
}
