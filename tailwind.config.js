const colors = require('@tailwindcss/ui/colors')

const colorPrimary = {
  100: '#e0f0fb',
  200: '#c1e1f8',
  300: '#a1d1f4',
  400: '#82c2f1',
  500: '#63b3ed',
  600: '#4f8fbe',
  700: '#3b6b8e',
  800: '#28485f',
  900: '#14242f',
};

function getColors(color, shades) {
  const result = {}
  shades.forEach(shade => {
    result[shade] = color[shade]
  })
  return result
}

module.exports = {
  purge: false,
  theme: {
    colors: {
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      yellow: getColors(colors.yellow, [50, 100, 200, 300, 700, 800]),
      red: getColors(colors.red, [100, 400]),
      green: getColors(colors.green, [100, 500, 800]),
      orange: getColors(colors.orange, [100, 800]),
      blue: getColors(colors.blue, [100, 200, 400]),
      teal: getColors(colors.teal, [100, 200, 300, 400, 600, 800]),
      indigo: getColors(colors.indigo, [100, 500, 800]),
      pink: getColors(colors.pink, [100, 300, 400, 500, 800]),
      primary: getColors(colorPrimary, [100, 200, 300, 400, 500, 600, 700, 800, 900]),
      'code-editor': {
        dark: '#252f3f',
        'dark-highlight': '#3e4d64',
      },
    },
    extend: {
      height: {
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '100': '25rem',
        '104': '26rem',
      },
      maxHeight: {
        '(screen-16)': 'calc(100vh - 4rem)',
      },
      maxWidth: {
        '(screen-34)': 'calc(100vw - 34rem)',
        '64': '16rem',
        '164': '41rem',
        '172': '43rem',
      },
      minWidth: {
        '72': '18rem',
        '40': '10rem',
      },
      marginRight: {
        '36': '9rem'
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
