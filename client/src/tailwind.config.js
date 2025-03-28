import ta from "tailwindcss-animate"

export const tailwind = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [ ta ],
  }