# tt-environment
Strongly typed, extensible environment variables.

## Install
#### Download package
Grab the latest release from the [Releases](https://github.com/Tiental/tt-environment/releases) page.
You want to download the tt-environment.tgz file.

#### Add to project
To install the package we recommend copying it into a shared folder in your repo.
Then you can install the local package with

> yarn add tt-environment@file:../packages/tt-environment


## Usage
Create a new class with `TTEnvironment` as base class.
```ts
import { TTEnvironment } from 'tt-environment'

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
```

Load your env vars. Could also use .env files and crossenv package.
```ts
process.env.SOME_STRING = "stringy";
process.env.SOME_NUMBER = "1234"
process.env.SOME_ENUM = "dev"
```

Init the environment.
```ts
Environment.init();
```

Use the variables
```ts
console.log(Environment.SOME_STRING)
console.log(Environment.SOME_NUMBER)
console.log(Environment.SOME_ENUM)
```
