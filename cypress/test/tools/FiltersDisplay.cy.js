import React from 'react';
import { mount } from '@cypress/react';
import FiltersDisplay from '../../../components/tools/FiltersDisplay';

const handleClickOption = (e, option, checkedValues, setValues) => {
  let tempValueArray = [...checkedValues];
  let index = checkedValues.indexOf(option);
  if (index > -1) {
    tempValueArray.splice(index, 1);
  }
  setValues(tempValueArray);
};

describe("FiltersDisplay component", () => {
  // define some mock data for the props
  const mockCheckedValues = ["red", "blue", "green"];
  let mockSetValues;

  // mount the component before each test
  beforeEach(() => {
    mockSetValues = cy.stub();
    cy.mount(<FiltersDisplay checkedValues={mockCheckedValues} setValues={mockSetValues} />);
  });

  // test that the component renders correctly
  it("renders the checked values as buttons", () => {
    // assert that the div element exists and has the correct class
    cy.get("[data-testid=FiltersDisplay-div]").should("exist").and("have.class", "max-w-lg flex gap-2 flex-wrap p-2 duration-200 delay-150");
    // assert that there are three buttons with the correct text and class
    cy.get("[data-testid=Filters-Display-Button]").should("have.length", 3).each(($btn, index) => {
      cy.wrap($btn).should("have.text", mockCheckedValues[index]).and("have.class", "hover:border-black border border-gray-600 text-gray-600 hover:text-black p-1 pb-0 rounded-2xl flex gap-1 items-start");
    });
  });

  // test that the buttons can be clicked to remove the checked values
  it("removes the checked values when clicked", () => {
    // click on the first button
    cy.get("[data-testid=Filters-Display-Button]").first().click();
    // assert that the mockSetValues function was called with the correct argument
    cy.wrap(mockSetValues).should("have.been.calledWith", ["blue", "green"]);
    // assert that the first button is removed from the DOM
    cy.get("[data-testid=Filters-Display-Button]").first().should("not.have.text", "red");
  });
});