import Expenses from "../components/FinancialSummary/ExpenseObject"
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

function FinancialSummary() {
  const title = "AsyncAPI Finance Summary";
  const description = "Financial Summary of AsyncAPI";

  return (
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
      <BarChartComponent data={Expenses} />
      <SuccessStories />
      <ContactUs />
    </>
  )
}

export default FinancialSummary
