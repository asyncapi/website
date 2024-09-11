import { create } from '@storybook/theming/create';

export default create({
  // Brand Information
  brandTitle: 'AsyncAPI Initiative',
  brandUrl: 'https://www.asyncapi.com/',
  brandImage: 'img/logos/asyncapi-horizontal-white-logo.svg',
  brandTarget: '_blank',

  // Typography
  fontBase: '"Work Sans", sans-serif',
  fontCode: 'monospace',


  // Themes
  base: 'dark',

  /* -- FULL THEME IS NOT BEING USED DUE TO LACK OF STORYBOOK SUPPORT FOR CUSTOMIZING THE SETTINGS & ACTIONS BAR BG/TEXTCOLOR INDEPENDENTLY. --
  colorPrimary: '#47BCEE',
  colorSecondary: '#8851FB',

  // UI
  appBg: '#1b1130',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#dfe6ea',
  appBorderRadius: 4,

  // Text colors
  textColor: '#ffffff',
  textInverseColor: '#ffffff',
  textMutedColor: '#5c6870',
  inputTextColor: '#2e3438',

  // Toolbar
  barTextColor: '#9E9E9E',

  // Toolbar default and active colors
  booleanBg: '#dfe6ea',
  booleanSelectedBg: '#8851FB'
  */
});
