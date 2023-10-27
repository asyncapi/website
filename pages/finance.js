import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Container from "../components/layout/Container";
import StickyNavbar from "../components/navigation/StickyNavbar";
import NavBar from "../components/navigation/NavBar";
import AsyncAPISummary from "../components/FinancialSummary/AsyncAPISummary";
import SponsorshipTiers from "../components/FinancialSummary/SponsorshipTiers";
import OtherFormsComponent from "../components/FinancialSummary/OtherFormsComponent";
import ExpenseBreakdown from "../components/FinancialSummary/ExpenseBreakdown";
import BarChartComponent from "../components/FinancialSummary/BarChartComponent";
import SuccessStories from "../components/FinancialSummary/SuccessStories";
import ContactUs from "../components/FinancialSummary/ContactUs";

function FinancialSummary() {
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
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <AsyncAPISummary className="px-4 sm:px-6 lg:px-8" />
      <SponsorshipTiers className="px-4 sm:px-6 lg:px-8" />
      <OtherFormsComponent className="px-4 sm:px-6 lg:px-8" />
      <ExpenseBreakdown className="px-4 sm:px-6 lg:px-8" />
      <BarChartComponent className="px-4 sm:px-6 lg:px-8" />
      <SuccessStories className="px-4 sm:px-6 lg:px-8" />
      <ContactUs className="px-4 sm:px-6 lg:px-8" />
    </>
  );

  const shouldUseContainer = windowWidth > 1700;

  return <div>{shouldUseContainer ? <Container wide>{renderComponents()}</Container> : renderComponents()}</div>;
}

export default FinancialSummary;
