const { convertToJson } = require('../scripts/utils'); // Adjust the path as necessary
const yaml = require('yaml');

// Mocking console.error to avoid polluting test output
global.console = { error: jest.fn() };

describe('convertToJson', () => {
  it('should return the input as is if it is not a string', () => {
    const input = { key: 'value' };
    const result = convertToJson(input);
    expect(result).toEqual(input);
  });

  it('should correctly parse a valid JSON string', () => {
    const jsonString = '{"key": "value"}';
    const result = convertToJson(jsonString);
    expect(result).toEqual({ key: 'value' });
  });

  it('should correctly parse a valid YAML string', () => {
    const yamlString = 'key: value';
    const result = convertToJson(yamlString);
    expect(result).toEqual({ key: 'value' });
  });
});
