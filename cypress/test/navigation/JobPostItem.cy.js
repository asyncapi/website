
import JobPostItem from '../../../components/navigation/JobPostItem'
import { mount } from '@cypress/react'
import MockRouter from '../../utils/router'
import { job } from '../../fixtures/navigation-mock'
describe('JobPostItem', () => {

  beforeEach(() => {
    mount(
      <MockRouter>  <JobPostItem job={ job } /> </MockRouter>
    )
  })
  it('renders the job title and company name', () => {
    cy.get('a').should('have.attr', 'href', job.slug)
    cy.get('img').should('have.attr', 'src', job.company.logoUrl)
    cy.contains(job.title + ' at ' + job.company.name)
      .should('exist')
  })
})
