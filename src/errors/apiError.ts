export type APIError = {
  statusCode: number;
  message: string;
  type: "APIError";
};

export const createAPIError = (statusCode: number, message: string) => ({
  statusCode,
  message,
  type: "APIError",
});
