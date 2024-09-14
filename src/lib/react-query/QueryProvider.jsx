import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
export function QueryProvider({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
    )
}