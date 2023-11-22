import React from "react";
import ReactDOM from "react-dom/client"
import "./index.css";
//<- Devtools ->
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactModal from "react-modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,

    }
  }
});

ReactModal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
{/*         <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} /> */}
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
