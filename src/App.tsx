import { ChakraProvider } from '@chakra-ui/provider';
import { extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Home from 'container/Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, refetchOnWindowFocus: false },
  },
});

const theme = extendTheme();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Home />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
