import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosResponse> => {
  let message = error.message;

  if (error.response?.data) {
    const apiError = error?.response?.data as ApiError;
    message = apiError.detail ?? apiError.title ?? error.message;
  }

  return Promise.reject(new Error(message));
};

const httpClient = axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(onRequest, onRequestError);
httpClient.interceptors.response.use(onResponse, onResponseError);

export { httpClient };
