import {iConfig } from './interface/iConfig.ts'
import { loglevel } from "./interface/iLogger.ts";
import { isdk } from "./interface/isdk.ts"

import { Config } from './Config.ts'
import { basesdk } from "./abstract/basesdk.ts"
import { sdkClient } from "./sdkClient.ts"
import {ApiRoot as sdkRoot} from "./sdkClient.ts"

export class sdk extends basesdk implements isdk{
   private static instance: sdk;
   private constructor(config: iConfig, apiRoot: sdkRoot, projectKey: string)
   {
      super(config, apiRoot, projectKey)
   }

   static init(verbose: loglevel= loglevel.quiet, manualconfig?: iConfig): sdk
   {
      if (!sdk.instance) {
         const config = Config.init(manualconfig)
         const apiRoot: sdkRoot = new sdkClient(config, verbose).withClientCredentials()
         const projectKey = config.project_key
         sdk.instance = new sdk(config, apiRoot, projectKey)
      }
      return sdk.instance
   }

   public apiRoot(): sdkRoot {
      return this._apiRoot as sdkRoot;
   }
}
