import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import AsyncAPISummary from '../components/FinancialSummary/AsyncAPISummary';
import BarChartComponent from '../components/FinancialSummary/BarChartComponent';
import ContactUs from '../components/FinancialSummary/ContactUs';
import ExpenseBreakdown from '../components/FinancialSummary/ExpenseBreakdown';
import OtherFormsComponent from '../components/FinancialSummary/OtherFormsComponent';
import SponsorshipTiers from '../components/FinancialSummary/SponsorshipTiers';
import SuccessStories from '../components/FinancialSummary/SuccessStories';
import Container from '../components/layout/Container';

/**
 * @description The FinancialSummary is the financial summary page of the website.
 * It contains the AsyncAPI summary, sponsorship tiers, other forms, expense breakdown,
 * bar chart, success stories, and contact us components.
 */
export default function FinancialSummary() {
  // Initialize as null to avoid hydration/layout shift
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
   const handleResize = () => {
    console.log("resized")
      setWindowWidth(window.innerWidth);
    };

  // Properly scoped resize handler with correct cleanup
  useEffect(() => {


    // Set initial width on mount
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const title = 'AsyncAPI Finance Summary';
  const description = 'Financial Summary of AsyncAPI';

  const renderComponents = () => (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
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

  // Avoid rendering until window size is known (prevents CLS)
  if (windowWidth === null) {
    return null; // or a skeleton/loading placeholder
  }

  const shouldUseContainer = windowWidth > 1700;

  return (
    <div className="w-full">
  <div className="2xl:container 2xl:mx-auto 2xl:px-8">
    {renderComponents()}
  </div>
</div>
  );
}
