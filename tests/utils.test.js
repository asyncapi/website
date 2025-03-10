const { convertToJson } = require('../scripts/utils.ts');
const { jsonString, yamlString, jsonObject, invalidString, number, array } = require('./fixtures/utilsData');

describe('convertToJson', () => {
  test('should return JSON object if input is valid JSON string', () => {
    expect(convertToJson(jsonString)).toEqual(jsonObject);
  });

  test('should return JavaScript object if input is valid YAML string', () => {
    expect(convertToJson(yamlString)).toEqual(jsonObject);
  });

  test('should return input if input is already an object', () => {
    expect(convertToJson(jsonObject)).toBe(jsonObject);
  });

  test('should throw error for non-string/object inputs', () => {
    expect(() => convertToJson(number)).toThrow('Input must be a string or an object');
    expect(() => convertToJson(array)).toThrow('Input must be a string or an object');
  });

  test('should throw error for invalid content format', () => {
    expect(() => convertToJson(invalidString)).toThrow('Invalid content format');
  });
});
