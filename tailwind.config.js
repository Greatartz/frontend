module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        title: "#444",
        subTitle: "#77787b",
        link: "#0068ff",
        borderColor: "#FFA028",
        bgColor: "#eaeaea",
      },
      minHeight: {
        custom: "475px",
        small: "220px",
        medium: "280px",
      },
      maxHeight: {
        small: "340px",
        smImage: "200px",
        revise: "200px",
      },
      width: {
        customW: "45%",
      },
      maxWidth: {
        myMaxWidth: "1400px",
        myMaxWidthHeader: "1450px",
      },
      minWidth: {
        smallMinWidth: "500px",
      },
      height: {
        myHeight: "90vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
