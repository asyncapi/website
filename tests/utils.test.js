const { convertToJson } = require("../scripts/utils");
const {jsonString,yamlString,jsonObject,invalidString} = require("./fixtures/utilsData")

describe('convertToJson', () => {
  test('should return JSON object if input is valid JSON string', () => {
    let result;
    try {
      result = convertToJson(jsonString);
    } catch (error) {
      result = error;
    }
    expect(result).toEqual(jsonObject);
  });

  test('should return JavaScript object if input is valid YAML string', () => {
    let result;
    try {
      result = convertToJson(yamlString);
    } catch (error) {
      result = error;
    }
    expect(result).toEqual(jsonObject);
  });

  test('should return input if input is already an object', () => {
    let result;
    try {
      result = convertToJson(jsonObject);
    } catch (error) {
      result = error;
    }
    expect(result).toBe(jsonObject);
  });

  test('should return null if input is invalid JSON and invalid YAML', () => {
    let result;
    try {
      result = convertToJson(invalidString);
    } catch (error) {
      result = error;
    }
    expect(result).toBeNull();
  });

});
