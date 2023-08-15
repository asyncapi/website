// Import the component and the mount function
import JobPostItem from '../../../components/navigation/JobPostItem'
import { mount } from '@cypress/react'
import MockRouter from '../../utils/router'
// Define a sample job object to pass as a prop
const job = {
  title: 'Front-end Developer',
  company: {
    name: 'Cypress',
    logoUrl: 'https://cypress.io/logo.png'
  },
  employmentType: 'full-time',
  category: 'engineering',
  location: 'remote',
  region: 'any',
  closingOn: '2023-08-31',
  slug: '/jobs/front-end-developer'
}

// Describe the test suite
describe('<JobPostItem />', () => {
  // Mount the component before each test
  beforeEach(() => {
    mount(
    <MockRouter>  <JobPostItem job={job} /> </MockRouter>
  )
  })
  it('renders the job title and company name', () => {
    cy.get('a').should('have.attr', 'href', job.slug) 
    cy.get('img').should('have.attr', 'src', job.company.logoUrl) 
    cy.contains(job.title + ' at ' + job.company.name) 
      .should('exist') 
  })


})
