const { convertToJson } = require("../scripts/utils");

describe('convertToJson', () => {
  test('should return JSON object if input is valid JSON string', () => {
    const jsonString = '{"name": "AsyncAPI", "age": 5}';
    let result;
    try {
      result = convertToJson(jsonString);
    } catch (error) {
      result = error;
    }
    expect(result).toEqual({ name: "AsyncAPI", age: 5 });
  });

  test('should return JavaScript object if input is valid YAML string', () => {
    const yamlString = 'name: AsyncAPI\nage: 5';
    let result;
    try {
      result = convertToJson(yamlString);
    } catch (error) {
      result = error;
    }
    expect(result).toEqual({ name: "AsyncAPI", age: 5 });
  });

  test('should return input if input is already an object', () => {
    const obj = { name: "AsyncAPI", age: 5 };
    let result;
    try {
      result = convertToJson(obj);
    } catch (error) {
      result = error;
    }
    expect(result).toBe(obj);
  });

  test('should return null if input is invalid JSON and invalid YAML', () => {
    const invalidString = 'name: AsyncAPI, age: five';
    let result;
    try {
      result = convertToJson(invalidString);
    } catch (error) {
      result = error;
    }
    expect(result).toBeNull();
  });

});
