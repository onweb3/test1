import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Swap from 'components/Bridge/Swap';

const queryClient = new QueryClient({});
function index() {
  return (
   <QueryClientProvider client={queryClient}>

    <Swap/>
   </QueryClientProvider>
  )
}

export default index