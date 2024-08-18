import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StockPriceChart } from "./pages/StockPriceChart";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StockPriceChart />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
