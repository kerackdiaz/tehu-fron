/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],

  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        // outfitThin: ["Outfit Thin", "sans-serif"],
        // outfitLight: ["Outfit Light", "sans-serif"],
        // outfitMedium: ["Outfit Medium", "sans-serif"],
        // outfitBold: ["Outfit Bold", "sans-serif"],
      },
      colors: {
        black: '#000000',
        blackTrans: '#00000096',
        border: '#707070',
        white: '#ffffff',
        whiteLight: '#F3FCFF',
        white3: '#F2F2F2',
        blueLight: '#76BCE9',
        blueLight2: '#99D5E8',
        blueLight3: '#E4F0F4',
        blueLight4: '#DFF3FA',
        blueDark: '#3683B5',
        blueDark2: '#36749D',
        blueHover: '#3D92C9',
        grayDark: '#616160',
        grayLight: '#AAABBA',
        greenLight: '#27D183',
        orangeLight: '#F1850A',
        pinkLight: '#EF4674',
      },
      boxShadow: {
        custom: '0px 0px 24px rgba(0, 0, 0, 0.50)',
        boxWhite: '0px 2px 4px rgba(0, 0, 0, 0.08)',
      },
      maxWidth: {
        '1320': '132rem',
      },
    },
  },
  plugins: [],
};
