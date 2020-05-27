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

module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        'primary-100': colorPrimary[100],
        'primary-200': colorPrimary[200],
        'primary-300': colorPrimary[300],
        'primary-400': colorPrimary[400],
        'primary-500': colorPrimary[500],
        'primary-600': colorPrimary[600],
        'primary-700': colorPrimary[700],
        'primary-800': colorPrimary[800],
        'primary-900': colorPrimary[900],
        'code-editor-dark': '#252f3f',
        'code-editor-dark-highlight': '#3e4d64',
      },
      textColor: {
        'primary-100': colorPrimary[100],
        'primary-200': colorPrimary[200],
        'primary-300': colorPrimary[300],
        'primary-400': colorPrimary[400],
        'primary-500': colorPrimary[500],
        'primary-600': colorPrimary[600],
        'primary-700': colorPrimary[700],
        'primary-800': colorPrimary[800],
        'primary-900': colorPrimary[900],
      },
      borderColor: {
        'primary-100': colorPrimary[100],
        'primary-200': colorPrimary[200],
        'primary-300': colorPrimary[300],
        'primary-400': colorPrimary[400],
        'primary-500': colorPrimary[500],
        'primary-600': colorPrimary[600],
        'primary-700': colorPrimary[700],
        'primary-800': colorPrimary[800],
        'primary-900': colorPrimary[900],
      },
      height: {
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '100': '25rem',
        '104': '26rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
