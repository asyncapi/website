import React from 'react';

import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import { expenseData } from '../data/ExpenseBreakdownData';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

/**
 * @description ExpenseBreakdown component displays a breakdown of expenses.
 */
export default function ExpenseBreakdown() {
  return (
    <div className='bg-[#EFFAFE] px-4 sm:px-6 lg:px-8'>
      <div className='mb-16 grid lg:grid-cols-9 lg:gap-8 lg:text-center'>
        <div className='col-span-7 col-start-2 my-12'>
          <div className='mx-2'>
            <Heading className='m-3 text-center text-base'>Expense Breakdown</Heading>
            <Paragraph
              typeStyle={ParagraphTypeStyle.md}
              className='mx-auto my-3 max-w-4xl text-center text-darkGunMetal'
            >
              Funds from GitHub Sponsors are directly transferred to our AsyncAPI Open Collective account. We maintain
              transparency in all expenses, and the TSC approves anticipated expenses.
            </Paragraph>
          </div>
          <div className='mx-3 mt-8 grid grid-cols-1 gap-10 md:grid-cols-3'>
            {expenseData.map((expense, index) => (
              <div
                key={index}
                className='flex flex-col items-center rounded-md bg-white p-4 shadow-md transition-transform hover:scale-105 active:scale-90'
              >
                <a href={expense.link} target='_blank' rel='noopener noreferrer'>
                  <div className='text-darkGunMetal'>
                    <div className='flex flex-col items-center'>
                      <img
                        src={expense.imageUrl}
                        alt={expense.title}
                        className='m-1 h-auto w-1/5 rounded-md object-cover'
                      />
                      <h2 className='my-2 text-center text-2xl font-semibold text-darkGunMetal'>{expense.title}</h2>
                    </div>
                    <p className='text-center text-base text-darkGunMetal'>{expense.description}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
