import { GeneralError } from "../models/Error";

export type RequestMethod = "GET";

interface HttpHeaders {
  [key: string]: string;
}

interface RequestInit<T> {
  headers?: HttpHeaders;
  body?: T;
}

export const GET = async (
  url: string,
  headers?: HttpHeaders,
  signal?: AbortSignal
): Promise<Response> => {
  return request("GET", url, { headers }, signal);
};

const injectBaseHeaders = (headers: HttpHeaders): HttpHeaders => {
  const base = {
    ...headers,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return base;
};

const parseError = (response: Response) => {
  throw new GeneralError(response.status, response.url);
};

const request = async <T>(
  method: RequestMethod,
  url: string,
  init: RequestInit<T> = {},
  signal?: AbortSignal
): Promise<Response> => {
  return await fetch(url, {
    method,
    headers: injectBaseHeaders(init.headers || {}),
    body: JSON.stringify(init.body),
    signal: signal,
  }).then((response) => {
    if (response.ok) {
      return response;
    } else return parseError(response);
  });
};
