<img src="https://deno.land/logo.svg" width=40px/>
<img src="https://commercetools.com/_build/images/logos/commercetools-logo-desktop.svg" width=150px/>


# deno commercetools api 🦕
## A small helper for using commercetools in combination with the deno runtime

***How to get started***

Install the Deno runtime on your machine, following this guidance: https://deno.land/

***Prerequisites***

A ```.env``` file in the root that contains the following:

```ini
CTP_PROJECT_KEY=******
CTP_CLIENT_SECRET=************
CTP_CLIENT_ID=****************
CTP_AUTH_URL=https://auth.europe-west1.gcp.commercetools.com
CTP_API_URL=https://api.europe-west1.gcp.commercetools.com
CTP_SCOPES=manage_project:ns-stations-demo
```

install the [language server](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) client for Deno in vscode, to make sure that vscode understands your code is for Deno and not for Node.

***using the api***
```javascript
import {sdk, Project} from "https://deno.land/x/commercetools@0.0.3/api.ts";

async function project(handle: sdk): Promise<Project>
{
   const result = await handle
      .apiRoot()
      .withProjectKey( { projectKey: handle.projectKey })
      .get({})
      .execute()
   return result.body
}
const pr = await project(sdk.init())
console.log(pr)
```

run this example with:

```deno run -A --unstable test.ts```

The unstable flag is needed for the not yet 100% supported nmp: imports