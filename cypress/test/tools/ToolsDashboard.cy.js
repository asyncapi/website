import { mount } from '@cypress/react';
import ToolDashboard from '../../../components/tools/ToolDashboard';
import ToolFilter from '../../../context/ToolFilterContext';

describe('ToolDashboard Component', () => {
  it('renders the ToolDashboard component correctly', () => {
    mount(
      <ToolFilter>
        <ToolDashboard />
      </ToolFilter>
    );

  });
});
