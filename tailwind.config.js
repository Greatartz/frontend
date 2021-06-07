module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        title:    '#444',
        subTitle: '#77787b',
        link:     '#0068ff',
        borderColor:   '#FFA028',
        bgColor:   '#eaeaea',
      },
	  minHeight: {
		'custom': '475px',
	  }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
