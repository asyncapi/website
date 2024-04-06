import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';

import AsyncAPISummary from '../components/FinancialSummary/AsyncAPISummary';
import BarChartComponent from '../components/FinancialSummary/BarChartComponent';
import ContactUs from '../components/FinancialSummary/ContactUs';
import ExpenseBreakdown from '../components/FinancialSummary/ExpenseBreakdown';
import OtherFormsComponent from '../components/FinancialSummary/OtherFormsComponent';
import SponsorshipTiers from '../components/FinancialSummary/SponsorshipTiers';
import SuccessStories from '../components/FinancialSummary/SuccessStories';
import Container from '../components/layout/Container';

export default function FinancialSummary() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleResizeRef = useRef<() => void>(null!);

  handleResizeRef.current = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResizeRef.current!();
    window.addEventListener('resize', handleResizeRef.current!);

    return () => {
      window.removeEventListener('resize', handleResizeRef.current!);
    };
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
      <BarChartComponent />
      <SuccessStories />
      <ContactUs />
    </>
  );

  const shouldUseContainer = windowWidth > 1700;

  return <div>{shouldUseContainer ? <Container wide>{renderComponents()}</Container> : renderComponents()}</div>;
}
