export { Config } from "./lib/Config.ts";
export type { iConfig } from "./lib/interface/iConfig.ts";
export { loglevel } from "./lib/interface/iLogger.ts"
export { sdkClient, ApiRoot as sdkRoot } from "./lib/sdkClient.ts"
export { sdk } from "./lib/sdk.ts"


export * from "npm:@commercetools/sdk-client-v2"
export * from "npm:@commercetools/platform-sdk"


/**
 * commercetools sdk wrapper for the sdk client
 * @author Willem Haring
 * @description This is the entry point for the commercetools api see https://docs.commmercetools.com/api
 * @example
 * ```js
 * import {sdk, Project, Store} from "https://deno.land/x/commercetools@0.05/api.ts";
 * 
 * async function project(handle: sdk): Promise<Store[]>
 * {
 *    const result = await handle
 *       .apiRoot()
 *       .withProjectKey( { projectKey: handle.projectKey })
 *       .stores()
 *       .get({})
 *       .execute()
 *    return result.body.results
 * }
 * const pr = await project(sdk.init())
 * console.log(pr)
 * ```
 */