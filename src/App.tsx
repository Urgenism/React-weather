import { ChakraProvider } from '@chakra-ui/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from 'container/Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, refetchOnWindowFocus: false },
  },
});

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
