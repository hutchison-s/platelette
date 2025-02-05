import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: "var(--font-display)",
        heading: "var(--font-heading)",
        body: "var(--font-body)"
      },
      borderWidth: {
        1: '1px',
      },
      borderRadius: {
        std: '0.25rem',
        xtra: '0.75rem',
      },
      padding: {
        sm: '0.4rem',
        std: '0.6rem',
        xtra: '1rem'
      },
      maxWidth: {
        600: '600px',
        800: '800px',
        1000: '1000px'
      },
      colors: {
        background: "rgb(var(--background))",
        background2: "rgb(var(--background2))",
        foreground: "rgb(var(--foreground))",
        primary: "rgb(var(--primary))",
        primary2: "rgb(var(--primary2))",
        secondary: "rgb(var(--secondary))",
        berry: {
          DEFAULT: '#d93036', 
           100: '#2d0809', 
           200: '#5a1013', 
           300: '#86191c', 
           400: '#b32126', 
           500: '#d93036', 
           600: '#e15a5e', 
           700: '#e88386', 
           800: '#f0acaf', 
           900: '#f7d6d7' 
          }, 
        darkberry: {
          DEFAULT: '#ac2024',
          100: '#220607',
          200: '#450d0f',
          300: '#671316',
          400: '#8a191d',
          500: '#ac2024',
          600: '#d93036',
          700: '#e36468',
          800: '#ec989a',
          900: '#f6cbcd' 
        }, 
        choc: {
          DEFAULT: '#664444',
          100: '#140d0d',
          200: '#281b1b',
          300: '#3d2828',
          400: '#513636',
          500: '#664444',
          600: '#8e5f5f',
          700: '#ad8484',
          800: '#c8adad',
          900: '#e4d6d6' 
        }, 
        darkchoc: {
          DEFAULT: '#251b18',
          100: '#070505',
          200: '#0f0b0a',
          300: '#16100f',
          400: '#1e1613',
          500: '#251b18',
          600: '#5b433c',
          700: '#926b5f',
          800: '#b89b92',
          900: '#dccdc9' 
        }, 
        cream: {
          DEFAULT: '#fff5eb',
          100: '#623100',
          200: '#c46200',
          300: '#ff9327',
          400: '#ffc489',
          500: '#fff5eb',
          600: '#fff7ef',
          700: '#fff9f3',
          800: '#fffbf7',
          900: '#fffdfb' 
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
