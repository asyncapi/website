/**
 * Regression tests for asyncapi/website#5755
 * "Go to page" dropdown does not correctly select pages on desktop.
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination "Go to page" dropdown (#5755)', () => {
  const setup = (page = 1, totalPages = 5) => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
    );
    return { onPageChange };
  };

  const openDropdown = () => {
    fireEvent.click(screen.getByLabelText('Select page'));
  };

  /** The dropdown items are the buttons INSIDE the dropdown container (not the
   * trigger, which also renders the current page number as text). */
  const dropdownItem = (page: number) => {
    const trigger = screen.getByLabelText('Select page');
    const container = trigger.parentElement!.querySelector('div.absolute')!;
    return Array.from(container.querySelectorAll('button')).find(
      (b) => b.textContent === String(page),
    )!;
  };

  it('selects a page on a single click even when the trigger loses focus (mousedown-before-blur)', () => {
    const { onPageChange } = setup();
    openDropdown();

    const target = dropdownItem(3);
    // Desktop click sequence: mousedown on the item blurs the trigger first.
    fireEvent.mouseDown(target);
    fireEvent.blur(screen.getByLabelText('Select page'));
    fireEvent.click(target);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('closes the dropdown after selecting a page', () => {
    setup();
    openDropdown();
    const two = dropdownItem(2);
    fireEvent.mouseDown(two);
    fireEvent.click(two);
    expect(screen.queryByLabelText('Select page')).not.toBeNull();
  });

  it('does not call onPageChange for the current page', () => {
    const { onPageChange } = setup(2);
    openDropdown();
    const two = dropdownItem(2);
    fireEvent.mouseDown(two);
    fireEvent.click(two);
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
