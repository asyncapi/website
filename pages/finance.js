import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Container from "../components/layout/Container";
import AsyncAPISummary from "../components/FinancialSummary/AsyncAPISummary";
import SponsorshipTiers from "../components/FinancialSummary/SponsorshipTiers";
import OtherFormsComponent from "../components/FinancialSummary/OtherFormsComponent";
import ExpenseBreakdown from "../components/FinancialSummary/ExpenseBreakdown";
import BarChartComponent from "../components/FinancialSummary/BarChartComponent";
import SuccessStories from "../components/FinancialSummary/SuccessStories";
import ContactUs from "../components/FinancialSummary/ContactUs";

export default function FinancialSummary() {
  const [windowWidth, setWindowWidth] = useState(0);

  const handleResizeRef = useRef(null);

  handleResizeRef.current = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResizeRef.current();
    window.addEventListener("resize", handleResizeRef.current);

    return () => {
      window.removeEventListener("resize", handleResizeRef.current);
    };
  }, []);

  const title = "AsyncAPI Finance Summary";
  const description = "Financial Summary of AsyncAPI";

  const renderComponents = () => (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <AsyncAPISummary/>
      <SponsorshipTiers/>
      <OtherFormsComponent/>
      <ExpenseBreakdown/>
      <BarChartComponent/>
      <SuccessStories/>
      <ContactUs/>
    </>
  );

  const shouldUseContainer = windowWidth > 1700;

  return <div>{shouldUseContainer ? <Container wide>{renderComponents()}</Container> : renderComponents()}</div>;
}
