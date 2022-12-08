import { iConfig } from "../interface/iConfig.ts";
import { isdk } from "../interface/isdk.ts";

export abstract class basesdk implements isdk{
   protected _config: iConfig
   protected _apiRoot: unknown
   protected _projectKey: string

   constructor(config: iConfig, apiRoot: unknown, projectKey: string)
   {
      this._config = config
      this._apiRoot = apiRoot
      this._projectKey = projectKey
   }

   public get config(): iConfig {
      return this._config;
   }

   public get projectKey(): string {
      return this._projectKey;
   }

   public showConfig()
   {
      console.log(this._config)
   }

   abstract apiRoot(): unknown 
   
}