// Assuming your test file is named "filters.spec.js"

import React from 'react';
import { mount } from '@cypress/react';
import Filters from '../../../components/tools/Filters';
import { useRef , useEffect,useState} from 'react';

const TestComponent = () => {
  const languageRef = useRef(null);
  const technologyRef = useRef(null);
  const categoryRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Filters
        setOpenFilter={() => {}}
        languageRef={languageRef.current}
        technologyRef={technologyRef.current}
        categoryRef={categoryRef.current}
      />
    )
  );
};

describe('Filters component', () => {
  it('should apply filters when "Apply filters" button is clicked', () => {
    mount(<TestComponent />);

    // Rest of the test code...
  });
});
