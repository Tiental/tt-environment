
class TTInjectionConfig {
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
      const injectionConfig = value as TTInjectionConfig

      // Now we get the enviroment value
      const envValue = this.getEnvironmentVariable(key)

      // And apply the postprocess
      thisObject[key] = injectionConfig.postprocess(envValue)
    }
    console.log('Environment has been set up')
  }

  protected static inject(postprocess?: (value: any) => any) {
    return new TTInjectionConfig(postprocess) as any;
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
