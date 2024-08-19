import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackError } from "..";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <ErrorBoundary FallbackComponent={FallbackError}>
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    </ErrorBoundary>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <ErrorBoundary FallbackComponent={FallbackError}>
          <QueryClientProvider client={testQueryClient}>
            {rerenderUi}
          </QueryClientProvider>
        </ErrorBoundary>
      ),
  };
}
