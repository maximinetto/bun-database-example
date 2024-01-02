import { expect } from "bun:test";

expect.extend({
  toJSONEqual: function (actual, expected) {
    const actualJSON = JSON.stringify(actual);
    const expectedJSON = JSON.stringify(expected);

    if (actualJSON === expectedJSON) {
      return {
        message: () => `expected ${this.utils.printReceived(
          actual,
        )} to be equal to ${this.utils.printExpected(
          expected,
        )}`,
        pass: true
      }
    }

    return {
      message: () => `expected ${this.utils.printReceived(
        actual,
      )} not to be equal to ${this.utils.printExpected(
        expected,
      )}`,
      pass: false
    }
  }
})

declare module 'bun:test' {
  interface AsymmetricMatchers {
    toJSONEqual(expected: unknown): void;
  }
  interface Matchers<T> {
    toJSONEqual(expected: unknown): T;
  }
}


