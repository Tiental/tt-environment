/* README:
This class contains base functionality for environment classes.
The idea would be to standardize this across project. I'm keeping it here for now since it's
alot of effort to make a shared package but this class is project agnostic.

YOU DON"T NEED TO CARE ABOUT THIS CODE. Email kobusvdwalt9@gmail.com if you have troubles or concerns. 

This class has a number of benefits :
* Static typed env variables make it easy to see which ENV variables are avaliable when coding.
* You only have to declare the ENV variable once.
* Startup checks ensure the environment variables are all defined.
* Allows for postprocessing of the value you get form the ENV file. Makes enums/booleans possible.

*/
class InjectionConfig {
  public injectionConfig = true;
  public postprocess;
  constructor(postprocess?: (value: any) => any) {
    this.postprocess = postprocess? postprocess : (value: any) => value;
  }
}

export class TTEnvironment {
  public static init() {
    const thisObject = (this as any)
    for(const key of Object.keys(this)) {
      console.log('Loading ENV variable : ' + key)
      const value = thisObject[key]

      if (typeof value !== 'object') {
        continue;
      }

      if (!value['injectionConfig']) {
        continue;
      }

      // At this point we know the value is an inject config
      const injectionConfig = value as InjectionConfig

      // Now we get the enviroment value
      const envValue = this.getEnvironmentVariable(key)

      // And apply the postprocess
      thisObject[key] = injectionConfig.postprocess(envValue)
    }
    console.log('Environment has been set up')
  }

  protected static inject(postprocess?: (value: any) => any) {
    return new InjectionConfig(postprocess) as any;
  }

  private static getEnvironmentVariable(variableName: string) {
    const variable = process.env[variableName]
    if (variable === undefined || variable === null) {
      throw new Error(`Environment variable "${variableName}" does not exist`)
    }
    if (variable === "") {
      throw new Error(`Environment variable "${variableName}" is an empty string`)
    }
    return variable
  }
}
