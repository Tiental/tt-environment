
import { TTEnvironment } from '../src/tt_index'

describe('Testing...', () => {
  enum SomeEnumeration {
    FIRST_VALUE,
    SECOND_VALUE,
  }

  class Environment extends TTEnvironment {
    public static SOME_STRING: string = this.inject();
    public static SOME_NUMBER: number = this.inject((value) => { return Number.parseFloat(value) });

    public static SOME_ENUM: SomeEnumeration = this.inject((value) => {
      if (value === 'first') {
        return SomeEnumeration.FIRST_VALUE;
      }
      if (value === 'production') {
        return SomeEnumeration.SECOND_VALUE;
      }
      return SomeEnumeration.SECOND_VALUE;
    });
  }

  test('Base test', () => {
    // Set env
    process.env.SOME_STRING = "stringy";
    process.env.SOME_NUMBER = "1234"
    process.env.SOME_ENUM = "dev"

    // Init env
    Environment.init();

    // Check correctness
    expect(typeof Environment.SOME_NUMBER).toBe('number')
    expect(typeof Environment.SOME_STRING).toBe('string')
  })
})