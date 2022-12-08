import { basesdk } from "./abstract/basesdk.ts"
import { isdk } from "./interface/isdk.ts";
import { Config, iConfig, importRoot, importClient } from "../mod.ts"
import { loglevel } from "./interface/iLogger.ts";

export class importsdk extends basesdk implements isdk{

   private static instance: importsdk;
   private constructor(config: iConfig, apiRoot: importRoot, projectKey: string)
   {
      super(config, apiRoot, projectKey)
   }

   static init(verbose: loglevel = loglevel.quiet, manualconfig?: iConfig): importsdk
   {
      if (!importsdk.instance) {
         const config = Config.init(manualconfig)
         if (config.import_url === undefined) throw new Error(`No import url specified in config, should be like: CTP_IMP_URL=https://import.europe-west1.gcp.commercetools.com/`)
         const apiRoot: importRoot = new importClient(config, verbose).withClientCredentials()
         const projectKey = config.project_key
         importsdk.instance = new importsdk(config, apiRoot, projectKey)
      }
      return importsdk.instance
   }

   public apiRoot(): importRoot {
      return this._apiRoot as importRoot;
   }
}