import { capitalize, uuid, getTodayDate, appendComma } from 'utils';

const testingArray = ['test1', 'test2'];

describe('General utils', () => {
  it('Capitalize first letter', () => {
    const test = 'test-string';
    expect(capitalize(test)).toEqual('Test-string');
  });
  it('Generate UUID', () => {
    Array(40)
      .fill(null)
      .forEach(() => {
        const id = uuid();
        expect(id.length).toBeGreaterThan(15);
        expect(id.length).toBeLessThan(25);
      });
  });
  it('Get today date', () => {
    const now = new Date();
    const date = getTodayDate();
    expect(date.length).toEqual(10);
    expect(date).toContain(`${now.getDate()}`);
    expect(date).toContain(`${now.getFullYear()}`);
    expect(date).toContain(`${now.getMonth() + 1}`);
  });
  it('Append comma', () => {
    expect(appendComma(testingArray.length, 0, testingArray[0])).toEqual(`${testingArray[0]}, `);
    expect(appendComma(testingArray.length, 1, testingArray[1])).toEqual(`${testingArray[1]}`);
  });
});
