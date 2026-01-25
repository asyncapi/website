import type { Meta, StoryObj } from '@storybook/react';

import Testimonial from './Testimonial';

const meta: Meta<typeof Testimonial> = {
  title: 'Components/Testimonial',
  component: Testimonial
};

export default meta;

type Story = StoryObj<typeof Testimonial>;

export const DefaultTestimonial: Story = {
  args: {
    text: 'AsyncAPI has been a game-changer for our team. The ability to document our event-driven architecture clearly has improved collaboration significantly.',
    authorName: 'John Doe',
    authorDescription: 'Senior Software Engineer at Tech Corp',
    authorAvatar: '/favicon-32x32.png'
  }
};

export const LongTestimonial: Story = {
  args: {
    text: 'Working with AsyncAPI has revolutionized how we approach event-driven architecture. The specification provides a clear, standardized way to document our message-driven APIs.',
    authorName: 'Robert Johnson',
    authorDescription: 'Principal Architect',
    authorAvatar: '/favicon-32x32.png'
  }
};
