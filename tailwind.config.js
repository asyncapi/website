const colorPrimary = {
  100: '#F4EFFC',
  200: '#E0D1FC',
  300: '#CAB0FC',
  400: '#A87EFC',
  500: '#8851FB',
  600: '#461E96'
};

const colorSecondary = {
  100: '#EDFAFF',
  200: '#CCF0FF',
  300: '#B2E8FF',
  400: '#80D9FF',
  500: '#47BCEE',
  600: '#1AA9C9'
}

const colorPink = {
  50: '#FCE7F5',
  100: '#FACFEB',
  200: '#F59FD6',
  300: '#EF6EC2',
  400: '#EA3EAD',
  500: '#E50E99',
  600: '#B70B7A',
  700: '#89085C',
  800: '#5C063D',
  900: '#2E031F'
}

const colorYellow = {
  50: '#FFFAEC',
  100: '#FFF6D9',
  200: '#FFEDB2',
  300: '#FFE48C',
  400: '#FFDB65',
  500: '#FFD23F',
  600: '#CCA832',
  700: '#997E26',
  800: '#665419',
  900: '#332A0D'
}

const colorGray = {
  50: '#F7F9FA',
  100: '#F0F4F5',
  200: '#E8ECED',
  300: '#D7DFE0',
  400: '#BFC6C7',
  500: '#A3ACAD',
  600: '#8B9394',
  700: '#556061',
  800: '#364042',
  900: '#242929'
}

function getColors(color, shades) {
  const result = {}
  shades.forEach(shade => {
    result[shade] = color[shade]
  })
  return result
}

module.exports = {
  content: ["./pages/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",],
  theme:{
    extend: {
      colors: {
        'gray': colorGray,
        'primary': colorPrimary,
        'secondary': colorSecondary,
        'pink': colorPink,
        'yellow': colorYellow,
        'code-editor': {
          'dark' : '#252f3f',
          'dark-highlight': '#3e4d64',
        },
        'dark': '#1B1130',
        'cool-gray':'#9C96A8',
        'hub': '#252f3f',
        'slack': '#371038',
        'mac-window': {
          'close': '#ff5f56',
          'minimize': '#ffbd2e',
          'maximize': '#28c93f',
        },
      }
    }
  }
}
