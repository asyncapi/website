import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import type { Language, Technology } from '@/types/components/tools/ToolDataType';

import tags from '../../config/all-tags.json';
import FiltersDropdown from './FiltersDropdown';

const meta: Meta<typeof FiltersDropdown> = {
  title: 'Components/FiltersDropdown',
  component: FiltersDropdown,
  argTypes: {
    dataList: {
      control: false
    },
    checkedOptions: {
      control: {
        type: 'object'
      }
    },
    setCheckedOptions: {
      control: false
    }
  }
};

export default meta;

type Story = StoryObj<typeof FiltersDropdown>;

const Dropdown: Story = {
  args: {
    checkedOptions: []
  },

  render: (args) => {
    const [{ checkedOptions }, updateArgs] = useArgs();

    const setCheckedOptions: React.Dispatch<React.SetStateAction<string[]>> = (newValue) => {
      if (typeof newValue === 'function') {
        const updatedValue = (newValue as (prevState: string[]) => string[])(checkedOptions);

        updateArgs({ checkedOptions: updatedValue });
      } else {
        updateArgs({ checkedOptions: newValue });
      }
    };

    return <FiltersDropdown {...args} checkedOptions={checkedOptions} setCheckedOptions={setCheckedOptions} />;
  }
};

const languageList = tags.languages as Language[];

export const LanguageDropdown: Story = {
  ...Dropdown,

  args: {
    ...Dropdown.args,
    dataList: languageList,
    checkedOptions: []
  }
};

const technologyList = tags.technologies as Technology[];

export const TechnologyDropdown: Story = {
  ...Dropdown,

  args: {
    ...Dropdown.args,
    dataList: technologyList,
    checkedOptions: []
  }
};
