const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...colors,
      gray: colors.gray,
      orange: colors.orange,
      red: colors.red,
      green: colors.green,
      gray: colors.gray,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
