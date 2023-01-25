const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

// delete deprecated colors that we don't use
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

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
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./config/tools.json"
  ],
  theme:{
    fontWeight: {
      'extra-light': 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    fontFamily: {
      'sans': ['Inter', ...defaultTheme.fontFamily.sans], 
      'heading': ['Work Sans', ...defaultTheme.fontFamily.sans],
      'body': ['Inter', ...defaultTheme.fontFamily.sans], 
      'mono': ['Fira Code VF', 'Fira Code', ...defaultTheme.fontFamily.mono],
    },
    minWidth: {
      '72': '18rem',
      '40': '10rem',
      '12': '3rem',
    },
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
      },
      scale: {
        '25': '.25',
      },
      padding: {
        '2ch': '2ch',
        '4ch': '4ch',
        '6ch': '6ch',
        '8ch': '8ch',
        '10ch': '10ch',
        '12ch': '12ch',
        '14ch': '14ch',
      },
      width:{
         'fit': 'fit-content'
      },
      height: {
        '88': '22rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
        'half-screen': '50vh',
      },
      maxWidth: {
        '(screen-16)': 'calc(100vw - 16rem)',
        '(screen-34)': 'calc(100vw - 34rem)',
        '64': '16rem',
        '164': '41rem',
        '172': '43rem',
        '184': '46rem',
      },
      minHeight: {
        '108': '27rem',
      },
      maxHeight: {
        '(screen-16)': 'calc(100vh - 4rem)',
        '108': '27rem',
        '(screen-14)': 'calc(100vh - 81px)',
        '120': '37rem'
      },
      margin: {
        '36': '9rem'
      },  
      borderRadius: {
        'xl': '1rem',
      },
      letterSpacing: {
        heading: '-0.03em',
        body: '-0.01em'
      },
      zIndex: {
        '60': 60,
      },
      rotate: {
        '-15': '-7deg'
      },
      fontSize: {
        'xxs': ['0.6rem', '0.6rem'],
        'heading-xs': ['16px', '1.375'],
        'heading-sm': ['20px', '1.375'],
        'heading-md': ['24px', '1.375'],
        'heading-lg': ['36px', '1.375'],
        'heading-xl': ['64px', '1.375'],
        'body-sm': ['14px', '1.625'],
        'body-md': ['16px', '1.625'],
        'body-lg': ['18px', '1.625']
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.hljs-asyncapi-file': {
          'color': colors.yellow[200],
        },
        '.hljs-generator-template': {
          'color': colors.teal[400],
        },
        '.hljs-generator-param': {
          'color': colors.pink[400],
        },
        '.font-ligatures-contextual': {
          'font-variant-ligatures': 'contextual',
        },
        '.scroll-none':{
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none', 
        },
        '.scroll-none::-webkit-scrollbar':{
          'display':'none',
          'scroll-behavior':'smooth',
        }
      })})
  ],
}
