[rightmove]: https://www.rightmove.co.uk
[adf-docs]: https://www.rightmove.co.uk/adf.html
[rtdf-spec]: https://media.rightmove.co.uk/ps/pdf/guides/adf/Rightmove_Real_Time_Datafeed_Specification.pdf

# Rightmove RTDF Client

Client for the [Rightmove][rightmove] Real Time Data Feed (RTDF) API.

The Rightmove RTDF API allows you to add, update and remove your properties and to retrieve reporting data for leads and performance metrics.

See the [docs][adf-docs] and [RTDF spec][rtdf-spec] for more information.


## Authentication

From the <cite>Rightmove RTDF Spec</cite>:
> The data feed functionality will only be accessible by an authorised party using a certificate provided by Rightmove. The certificate
will contain a private key and an X509 certificate. This will be provided in whichever keystore file format is most suitable for the
client’s implementation (i.e. JKS or JCEKS for Java, PKCS#12 for Windows applications and PEM for other languages).

The certificate provided by Rightmove can be used to authenticate requests made using the client by constructing a HTTPS Agent.


## Usage

### Installation

Install with `npm i rightmove`.

### Example: create an authenticated Agent to use with requests

```ts
import { Agent } from "node:https";

export const NETWORK_ID = Number.parseInt(process.env.NETWORK_ID);
export const BRANCH_ID = Number.parseInt(process.env.BRANCH_ID);

const CERT_PEM = Buffer.from(process.env.CERT_PEM_BASE64, "base64");
const CERT_PASSPHRASE = process.env.CERT_PASSPHRASE;

export const AGENT = new Agent({
  cert: CERT_PEM,
  key: CERT_PEM,
  passphrase: CERT_PASSPHRASE,
});
```

### Example: create a RTDF client and make a `GetBranchPropertyList` call

```ts
import { Client } from "rightmove-rtdf";

import { AGENT, BRANCH_ID, NETWORK_ID } from "./path/to/credentials";

const client = new Client({
  test: false, // (optional) set to `true` to use the Rightmove test endpoint
  requestOptions: {
    agent: AGENT, // (optional) set a default agent for all calls
  },
});

const getBranchPropertyListResponse = await client.getBranchPropertyList({
  network: {
    network_id: NETWORK_ID,
  },
  branch: {
    branch_id: BRANCH_ID,
  },
});

if (getBranchPropertyListResponse.success) {
  // handle successful request
} else {
  // handle failed request
}
```
