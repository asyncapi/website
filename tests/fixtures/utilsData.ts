import type { UtilsData } from '../../types/tests/fixtures/utilsData';

export const utilsData: UtilsData = {
    jsonString: '{"name": "AsyncAPI", "age": 5}',
    yamlString: 'name: AsyncAPI\nage: 5',
    jsonObject: { name: "AsyncAPI", age: 5 },
    invalidString: 'name: AsyncAPI, age: five'
};
