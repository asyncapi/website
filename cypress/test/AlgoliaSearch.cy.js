import { mount } from 'cypress/react'
import AlgoliaSearch from '../../components/AlgoliaSearch'
describe('AlgoliaSearch component', () => {
    it('renders without errors', () => {
        mount(<AlgoliaSearch />);
    });
});