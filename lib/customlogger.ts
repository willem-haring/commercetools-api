import { loglevel } from "./interface/iLogger.ts"

export function customLogger(verbose: loglevel = loglevel.quiet) {
   // deno-lint-ignore no-explicit-any
   return (next: any) => {
     // deno-lint-ignore no-explicit-any
      return (request: any, response: any) => {
         const { error, body, statusCode } = response
         if (verbose !== loglevel.quiet)
         {
            console.log('Request: ', request)
            console.log('Response: ', { error, body, statusCode })
         }
         next(request, response)
      }
   }
}