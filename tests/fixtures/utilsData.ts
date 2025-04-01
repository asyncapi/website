interface UtilsData {
  jsonString: string;
  yamlString: string;
  jsonObject: { name: string; age: number };
  invalidString: string;
}
export const utilsData: UtilsData = {
  jsonString: '{"name": "AsyncAPI", "age": 5}',
  yamlString: 'name: AsyncAPI\nage: 5',
  jsonObject: { name: "AsyncAPI", age: 5 },
  invalidString: 'name: AsyncAPI, age: five'
};

export default utilsData;
