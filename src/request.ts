import fetch, { Headers, RequestInit } from "node-fetch";

export type RequestOptions = Pick<RequestInit, "agent" | "signal" | "headers">;

export async function request<TData>(
  url: URL,
  data: TData,
  options?: RequestOptions,
) {
  const headers = new Headers(options?.headers);
  headers.set("content-type", "application/json");
  headers.set("accept", "application/json");

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    agent: options?.agent,
    signal: options?.signal,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
}
