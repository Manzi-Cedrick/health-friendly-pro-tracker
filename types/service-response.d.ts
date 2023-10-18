interface ServiceAPIResponse<T> {
  body: T;
  statusCode: number;
  headers?: Object;
  message: string;
}

export { ServiceAPIResponse }
