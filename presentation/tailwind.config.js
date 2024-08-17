const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    flowbite.content(),
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      animation: {
        'animBack': 'animBack 6s linear infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(4px)',
      },
    },
    fontFamily: {
      SansitaSwashed: ["Sansita Swashed", "system-ui"],
      Poppins: ["Poppins", "sans-serif"]
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}