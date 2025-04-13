import { isMultipleOf } from "./multipleOfValidator";

describe('MultipleOfValidator Test', () => {
  fit('should return true for multiple of 100', () => {
    let result = isMultipleOf(200, 100);
    expect(result).toBe(true);
  });

  fit('should return false for multiple of 100', () => {
    let result = isMultipleOf(250, 100);
    expect(result).toBe(false);
  });

  fit('should return false for multiple of 0', () => {
    let result = isMultipleOf(250, 0);
    expect(result).toBe(false);
  });
});