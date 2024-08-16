import axios, { AxiosRequestConfig } from "axios";

export const api = {
  get: <TResponse>(url: string, params?: AxiosRequestConfig) =>
    axios
      .get<TResponse>(url, {
        ...params,
      })
      .catch((error) => {
        return Promise.reject(error);
      }),
};
