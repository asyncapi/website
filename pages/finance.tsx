import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import AsyncAPISummary from '../components/FinancialSummary/AsyncAPISummary';
import ContactUs from '../components/FinancialSummary/ContactUs';
import ExpenseBreakdown from '../components/FinancialSummary/ExpenseBreakdown';
import OtherFormsComponent from '../components/FinancialSummary/OtherFormsComponent';
import SponsorshipTiers from '../components/FinancialSummary/SponsorshipTiers';
import SuccessStories from '../components/FinancialSummary/SuccessStories';
import Container from '../components/layout/Container';

const BarChartComponent = dynamic(() => import('../components/FinancialSummary/BarChartComponent'), { ssr: false });

/**
 * @description The FinancialSummary is the financial summary page of the website.
 * It contains the AsyncAPI summary, sponsorship tiers, other forms, expense breakdown,
 * bar chart, success stories, and contact us components.
 */
export default function FinancialSummary() {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

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
      {mounted && <BarChartComponent />}
      <SuccessStories />
      <ContactUs />
    </>
  );

  const shouldUseContainer = mounted && windowWidth > 1700;

  return <div>{shouldUseContainer ? <Container wide>{renderComponents()}</Container> : renderComponents()}</div>;
}
