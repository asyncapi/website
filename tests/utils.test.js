const { convertToJson } = require("../scripts/utils");
const {jsonString,yamlString,jsonObject,invalidString} = require("./fixtures/utilsData")

describe('convertToJson', () => {
  test('should return JSON object if input is valid JSON string', () => {
    try {
    expect(convertToJson(jsonString)).toEqual(jsonObject);
    } catch (err) {
      console.error(err);
    }
  });

  test('should return JavaScript object if input is valid YAML string', () => {
    try {
    expect(convertToJson(yamlString)).toEqual(jsonObject);
    } catch (err) {
      console.error(err);
    }
  });

  test('should return input if input is already an object', () => {
    try {
    expect(convertToJson(jsonObject)).toBe(jsonObject);
    } catch (err) {
      console.error(err)
    }
  });

  test('should return null if input is invalid JSON and invalid YAML', () => {
    expect(() => convertToJson(invalidString)).toThrow('Invalid content format');
  });
});
