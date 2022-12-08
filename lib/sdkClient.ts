import { iConfig } from "./interface/iConfig.ts"
import { customLogger } from "./customlogger.ts"
import { ClientBuilder } from "npm:@commercetools/sdk-client-v2"
import { ApiRoot, createApiBuilderFromCtpClient } from "npm:@commercetools/platform-sdk"
import { loglevel } from "./interface/iLogger.ts"
export { ApiRoot } from "npm:@commercetools/platform-sdk"
export * from "npm:@commercetools/platform-sdk"
export * from "npm:@commercetools/platform-sdk"

export class sdkClient {
  protected _config: iConfig
  protected _projectKey: string
  protected _verbose: loglevel

  constructor(config: iConfig, verbose: loglevel = loglevel.quiet) {
    this._config = config
    this._projectKey = config.project_key
    this._verbose = verbose
  }

  public withClientCredentials(): ApiRoot {
    this._projectKey = this._config.project_key

    const client = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withClientCredentialsFlow({
        credentials: {
          clientId: this._config.client_id,
          clientSecret: this._config.client_secret
        },
        host: this._config.auth_url, 
        projectKey: this._projectKey
      })
      .withHttpMiddleware({
        host: this._config.api_url
      })
      .withMiddleware(customLogger(this._verbose)) 
      .build()
    return createApiBuilderFromCtpClient(client)
  }

  public withUsernamePassword(username: string, password: string): ApiRoot {
    this._projectKey = this._config.project_key

    const client = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withPasswordFlow({
        credentials: {
          clientId: this._config.client_id,
          clientSecret: this._config.client_secret,
          user: {
            username: username,
            password: password
          }
        },
        host: this._config.auth_url,
        projectKey: this._projectKey
      })
      .withHttpMiddleware({
        host: this._config.api_url
      })
      .withMiddleware(customLogger(this._verbose)) 
      .build()
    return createApiBuilderFromCtpClient(client)
  }

  public withAnonymous(anonymousId?: string): ApiRoot {
    this._projectKey = this._config.project_key

    const client = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withAnonymousSessionFlow({
        credentials: {
          clientId: this._config.client_id, 
          clientSecret: this._config.client_secret,
          anonymousId: anonymousId
        },
        host: this._config.auth_url,
        projectKey: this._projectKey
      })
      .withHttpMiddleware({
        host: this._config.api_url
      })
      .withMiddleware(customLogger(this._verbose)) 
      .build()
    return createApiBuilderFromCtpClient(client)
  }
}