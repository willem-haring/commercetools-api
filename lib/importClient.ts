import { iConfig } from "./interface/iConfig.ts"
import { customLogger } from "./customlogger.ts"
import { ClientBuilder } from "npm:@commercetools/sdk-client-v2"
import { createApiBuilderFromCtpClient, ApiRoot } from "npm:@commercetools/importapi-sdk"
import { loglevel } from "./interface/iLogger.ts"
export { ApiRoot } from "npm:@commercetools/importapi-sdk"

export class importClient {
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
            host: this._config.import_url!,
            fetch,
         })
         .withMiddleware(customLogger(this._verbose)) 
         .withUserAgentMiddleware()
         .build()
      return createApiBuilderFromCtpClient(client)
   }
}
