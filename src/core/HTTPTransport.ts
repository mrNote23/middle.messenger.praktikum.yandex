import { API_URL } from "./config/endpoints";

export enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type TOptions = {
  method: METHODS;
  timeout?: number;
  headers?: Array<object>;
  data?: object;
};

export class HTTPTransport {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${API_URL}${endpoint}`;
  }

  public get<Response>(
    path = "/",
    data?: unknown,
    headers?: Array<object>
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.GET,
      data,
      headers,
    });
  }

  public put<Response>(
    path = "/",
    data?: unknown,
    headers?: Array<object>
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PUT,
      data,
      headers,
    });
  }

  public post<Response>(
    path = "/",
    data?: unknown,
    headers?: Array<object>
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.POST,
      data,
      headers,
    });
  }

  public patch<Response>(
    path = "/",
    data?: unknown,
    headers?: Array<object>
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PATCH,
      data,
      headers,
    });
  }

  public delete<Response>(
    path = "/",
    data?: unknown,
    headers?: Array<object>
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.DELETE,
      data,
      headers,
    });
  }

  private request = <TResponse>(
    url: string,
    options: TOptions = {
      method: METHODS.GET,
      timeout: 1000,
    }
  ): Promise<TResponse> => {
    const { method, data, headers, timeout } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET) {
        if (data) {
          url = `${url}?${Object.entries(data)
            .map(([key, value]: [key: string, value: string]): string => {
              return `${key}=${value}`;
            })
            .join("&")}`;
        }
      }

      xhr.open(method, url);
      if (typeof timeout === "number") {
        xhr.timeout = timeout;
      }
      xhr.withCredentials = true;

      if (headers) {
        headers.forEach((item) => {
          xhr.setRequestHeader(
            Object.entries(item)[0][0],
            Object.entries(item)[0][1]
          );
        });
      }

      xhr.onload = () => {
        let response;
        if (
          !xhr?.getResponseHeader("Content-Type")?.indexOf("application/json")
        ) {
          response = JSON.parse(xhr.response);
        } else {
          response = xhr.response;
        }

        if (xhr.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      };

      xhr.onabort = () => reject({ reason: "connection abort" });
      xhr.onerror = () => reject({ reason: "connection error" });
      xhr.ontimeout = () => reject({ reason: "connection timeout" });

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
