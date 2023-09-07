import BarChartComponent from "../components/FinancialSummary/BarChartComponent"
import ExpenseBreakdown from "../components/FinancialSummary/ExpenseBreakdown"
import SponsorshipTiers from "../components/FinancialSummary/SponsorshipTiers"
import SuccessStories from "../components/FinancialSummary/SuccessStories"
import AsyncAPISummary from "../components/FinancialSummary/AsyncAPISummary"
import OtherFormsOfFinancialSupport from "../components/FinancialSummary/OtherFormsOfFinancialSupport"
import ContactUs from "../components/FinancialSummary/ContactUs"
import NavBar from "../components/navigation/NavBar"
import Head from "next/head"
import StickyNavbar from "../components/navigation/StickyNavbar"
import Container from "../components/layout/Container"
import { useEffect, useState } from "react"

function FinancialSummary() {
  const [windowWidth, setWindowWidth] = useState(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  // Update the window width when the component mounts and when the window is resized
  useEffect(() => {

    // Initial width
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const title = "AsyncAPI Finance Summary";
  const description = "Financial Summary of AsyncAPI";

  // Use Container only if the window width is more than 1700px
  const shouldUseContainer = windowWidth > 1700;

  return (
    <div>
      {shouldUseContainer ? (
        <Container wide>
          <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
          </Head>
          <StickyNavbar>
            <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
          </StickyNavbar>
          <AsyncAPISummary />
          <SponsorshipTiers />
          <OtherFormsOfFinancialSupport />
          <ExpenseBreakdown />
          <BarChartComponent />
          <SuccessStories />
          <ContactUs />
        </Container>
      ) : (
        <>
          <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
          </Head>
          <StickyNavbar>
            <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
          </StickyNavbar>
          <AsyncAPISummary />
          <SponsorshipTiers />
          <OtherFormsOfFinancialSupport />
          <ExpenseBreakdown />
          <BarChartComponent />
          <SuccessStories />
          <ContactUs />
        </>
      )}
    </div>
  );
}
export default FinancialSummary
