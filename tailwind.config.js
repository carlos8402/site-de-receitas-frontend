/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "570px", // Padrão pequeno
        md: "768px", // Padrão médio
        lg: "1024px", // Padrão grande
        xl: "1280px", // Tela extra grande
        "2xl": "1536px", // Tela extra grande
      },
    },
  },
  plugins: [],
};
