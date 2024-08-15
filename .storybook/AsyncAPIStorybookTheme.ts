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
  base: 'light',
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


  // Toolbar default and active colors
  booleanBg: '#dfe6ea',
  booleanSelectedBg: '#8851FB'
});
