import React, { useEffect, useState, useCallback, useRef } from "react";
import Head from "next/head";
import Container from "@/components/layout/Container";
import AsyncAPISummary from "../components/FinancialSummary/AsyncAPISummary";
import SponsorshipTiers from "../components/FinancialSummary/SponsorshipTiers";
import OtherFormsComponent from "../components/FinancialSummary/OtherFormsComponent";
import ExpenseBreakdown from "../components/FinancialSummary/ExpenseBreakdown";
import BarChartComponent from "../components/FinancialSummary/BarChartComponent";
import SuccessStories from "../components/FinancialSummary/SuccessStories";
import ContactUs from "../components/FinancialSummary/ContactUs";

/**
 * FinancialSummary component renders the financial summary page.
 * It includes various components such as AsyncAPISummary, SponsorshipTiers, BarChartComponent, etc.
 */
const FinancialSummary: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  /**
   * Callback function to handle window resize event.
   */
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const handleResizeRef = useRef(handleResize);

  useEffect(() => {
    /**
     * Set the initial window width on the client-side.
     */
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }

    handleResizeRef.current = handleResize;
    window.addEventListener("resize", handleResizeRef.current);
    return () => {
      window.removeEventListener("resize", handleResizeRef.current);
    };
  }, [handleResize]);

  const title: string = "AsyncAPI Finance Summary";
  const description: string = "Financial Summary of AsyncAPI";

  /**
   * Render all components of the financial summary page.
   * @returns JSX.Element representing the financial summary page.
   */
  const renderComponents = (): JSX.Element => (
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

  /**
   * Determine if a wide container should be used based on the window width.
   */
  const shouldUseContainer = windowWidth > 1700;

  return (
    <div>
      {shouldUseContainer ? <Container wide>{renderComponents()}</Container> : renderComponents()}
    </div>
  );
};

export default FinancialSummary;
