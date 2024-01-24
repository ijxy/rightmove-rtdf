import https from "node:https";

import fetch from "node-fetch";

export type PostOptions = Pick<https.RequestOptions, "agent" | "signal">;

export async function post<TData>(
  url: URL,
  data: TData,
  options?: PostOptions,
) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
    agent: options?.agent,
    signal: options?.signal,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
}
