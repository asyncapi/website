import { convertToJson } from '../scripts/utils.ts';
import utilsData from './fixtures/utilsData';

const { jsonString, yamlString, jsonObject, invalidString } = utilsData;

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

  test('should throw an error if input is invalid JSON and invalid YAML', () => {
    try {
      convertToJson(invalidString);
      expect(convertToJson(invalidString)).toBeUndefined();
    } catch (error) {
      expect(error.message.includes('Invalid content format')).toBeTruthy();
    }
  });
});
