import Head from 'next/head';
import React from 'react';

import AsyncAPISummary from '../components/FinancialSummary/AsyncAPISummary';
import BarChartComponent from '../components/FinancialSummary/BarChartComponent';
import ContactUs from '../components/FinancialSummary/ContactUs';
import ExpenseBreakdown from '../components/FinancialSummary/ExpenseBreakdown';
import OtherFormsComponent from '../components/FinancialSummary/OtherFormsComponent';
import SponsorshipTiers from '../components/FinancialSummary/SponsorshipTiers';
import SuccessStories from '../components/FinancialSummary/SuccessStories';

/**
 * @description The FinancialSummary is the financial summary page of the website.
 * It contains the AsyncAPI summary, sponsorship tiers, other forms, expense breakdown,
 * bar chart, success stories, and contact us components.
 */
export default function FinancialSummary() {
  const title = 'AsyncAPI Finance Summary';
  const description = 'Financial Summary of AsyncAPI';

  const renderComponents = () => (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <AsyncAPISummary />
      <SponsorshipTiers />
      <OtherFormsComponent />
      <ExpenseBreakdown />
      <BarChartComponent />
      <SuccessStories />
      <ContactUs />
    </>
  );

  return <div className='w-full 2xl:mx-auto 2xl:max-w-screen-xl'>{renderComponents()}</div>;
}
