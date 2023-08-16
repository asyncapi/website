import { sortFilter, applyFilterList, onFilterApply } from "../../../components/helpers/applyFilter";

describe('sortFilter function', () => {
  it('should sort an array of objects by their value property', () => {
    const input = [
      { name: 'Alice', value: 3 },
      { name: 'Bob', value: 1 },
      { name: 'Charlie', value: 2 },
    ];
    const expected = [
      { name: 'Bob', value: 1 },
      { name: 'Charlie', value: 2 },
      { name: 'Alice', value: 3 },
    ];
    const output = sortFilter(input);
    expect(output).to.deep.equal(expected);
  });
});
/**
 * this function is designed to generate filter lists based on the provided data and filter conditions. 
 * It iterates through the data and creates filter entries in the lists according to certain rules, 
 *  including checking for duplicates and sorting the filter values. 
 */

describe('applyFilterList function', () => {
  it('should apply filters to a list of data and sort them by value', () => {
    //"checks" array that filters on the basis of name , age ,gender 
    //we are checking if code works on expected Array or not 
    const checks = [
      { name: 'name', checked: true },
      { name: 'age', checked: true },
      { name: 'gender', checked: true },
    ];
    const data = [
      { name: 'Alice', age: 25, gender: 'female' },
      { name: 'Bob', age: 30, gender: 'male' },
      { name: 'Charlie', age: 28, gender: 'male' },
      { name: 'David', age: 22, gender: 'male' },
      { name: 'Eve', age: 27, gender: 'female' },
    ];

    const expected = {
      name: [
        { value: 'Alice', text: 'Alice' },
        { value: 'Bob', text: 'Bob' },
        { value: 'Charlie', text: 'Charlie' },
        { value: 'David', text: 'David' },
        { value: 'Eve', text: 'Eve' },
      ],
      age: [
        { value: 22, text: 22 },
        { value: 25, text: 25 },
        { value: 27, text: 27 },
        { value: 28, text: 28 },
        { value: 30, text: 30 },
      ],
      gender: [
        { value: 'female', text: 'female' },
        { value: 'male', text: 'male' },
      ],
    };
    let filters = {};
    applyFilterList(checks, data, (lists) => {
      filters = lists;
    });
    expect(filters).to.deep.equal(expected);
  });
});

describe('onFilterApply function', () => {
  /**
   * function onFilterApply that is intended to filter data based on a given query 
   * and then call a specified callback function (onFilter) with the filtered result.
   */
  it('should filter a list of data by a query object and return the filtered result', () => {

    /**
     * mock data (an array of data to be filtered),
     * mock onFilter (a callback function to be called with the filtered data)
     * mock query (an object containing filter criteria).
     */
      const data = [
      { name: 'Alice', age: 25, gender: 'female', hobbies: ['reading', 'writing'] },
      { name: 'Bob', age: 30, gender: 'male', hobbies: ['gaming', 'coding'] },
      { name: 'Eve', age: 27, gender: 'female', hobbies: ['sports', 'dancing'] },
    ];
    const query = { gender: 'female', hobbies: 'sports' };
    const expected = [
      { name: 'Eve', age: 27, gender: 'female', hobbies: ['sports', 'dancing'] },
    ];
    let result = [];
    onFilterApply(data, (filtered) => {
      result = filtered;
    }, query);

    expect(result).to.deep.equal(expected);
  });
});