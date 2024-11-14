const hello = require("../scripts/hello")

describe('hello function', () => {
    test('should test hello', ()=>{
        let h1 = hello();
        expect(h1).toBe("hello")
    })
});
