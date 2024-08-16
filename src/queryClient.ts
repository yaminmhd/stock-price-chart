import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false, //due to api rate limiting of 5 requests per minute
    },
  },
};
export const queryClient = new QueryClient(queryClientConfig);
