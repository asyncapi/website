import GenericLayout from "../components/layout/GenericLayout"
import Container from '../components/layout/Container'
import Expenses from "../components/FinancialSummary/ExpenseObject"
import BarChartComponent from "../components/FinancialSummary/BarChartComponent"
import ExpenseBreakdown from "../components/FinancialSummary/ExpenseBreakdown"
import SponsorshipTiers from "../components/FinancialSummary/SponsorshipTiers"
import SuccessStories from "../components/FinancialSummary/SuccessStories"
import AsyncAPISummary from "../components/FinancialSummary/AsyncAPISummary"
import OtherFormsOfFinancialSupport from "../components/FinancialSummary/OtherFormsOfFinancialSupport"
import ContactUs from "../components/FinancialSummary/ContactUs"

function FinancialSummary() {
  const title = "AsyncAPI Finance Summary";
  const description = "Financial Summary of AsyncAPI";
  const image = "/";
  return (
    <GenericLayout
      title={title}
      description={description}
      image={image}
      wide
    >
      <Container wide>
        <AsyncAPISummary />
        <SponsorshipTiers />
        <OtherFormsOfFinancialSupport />
        <ExpenseBreakdown />
        <SuccessStories />
        <BarChartComponent data={Expenses} />
        <ContactUs />
      </Container>

    </GenericLayout>
  )
}

export default FinancialSummary
