/* eslint-disable import/no-extraneous-dependencies */
import { ColorItem, ColorPalette } from '@storybook/blocks';
import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Design Tokens/Colors',
  component: ColorPalette
};

export default meta;

export const Colors = () => (
  <>
    <ColorPalette>
      <ColorItem
        title='Primary'
        subtitle='This is the primary color palette across all products.'
        colors={{
          50: '#efe6fd',
          100: '#ceb0fa',
          200: '#b78af7',
          300: '#9654f4',
          400: '#8133f1',
          500: '#6200ee',
          600: '#5900d9',
          700: '#4600a9',
          800: '#360083',
          900: '#290064'
        }}
      />
    </ColorPalette>
  </>
);
