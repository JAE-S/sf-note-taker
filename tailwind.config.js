/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#073742', // Dark teal - main brand color
        seaweed: {
          100: '#ebfafe', // Very light teal - backgrounds
          200: '#08272e', // Darker teal - footer backgrounds
        },
        sky: {
          100: '#ebfafe', // Light sky blue
          200: '#88d7f0', // Medium sky blue
          300: '#1798c1', // Darker sky blue for links
        },
        pink: {
          100: '#ffdef7', // Light pink
          600: '#fc84e1', // Medium pink for highlights
        },
        horizon: {
          100: '#ff9254', // Orange/coral for accent
        },
        gray: {
          50: '#fafafa',
          100: '#f5f7fa',
          200: '#ebeff0',
          400: '#aab1b7',
          450: '#5c818a',
          500: '#889ba0',
          700: '#5A6C71',
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        decorative: ['Rock Salt', 'cursive'],
        mono: ['Source Code Pro', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '4rem', // 64px
      },
      spacing: {
        0: '0',
        5: '0.3125rem', // 5px
        10: '0.625rem', // 10px
        20: '1.25rem', // 20px
        30: '1.875rem', // 30px
        40: '2.5rem', // 40px
        50: '3.125rem', // 50px
        60: '3.75rem', // 60px
        70: '4.375rem', // 70px
        80: '5rem', // 80px
        90: '5.625rem', // 90px
        100: '6.25rem', // 100px
        110: '6.875rem', // 110px
        120: '7.5rem', // 120px
        140: '8.75rem', // 140px
        150: '9.375rem', // 150px
        160: '10rem', // 160px
        180: '11.25rem', // 180px
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem', // 2px
        DEFAULT: '0.25rem', // 4px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px
        xl: '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
        '4xl': '2rem', // 32px
        '5xl': '2.5rem', // 40px
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 2px 10px rgba(0, 0, 0, 0.1)',
        md: '0 4px 8px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        none: 'none',
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1440px',
      },
    },
  },
  plugins: [],
};
