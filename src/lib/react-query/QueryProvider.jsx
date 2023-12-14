import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
export function QueryProvider({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
    )
}