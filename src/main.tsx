import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: 0,
            backgroundColor: "rgba(var(--color-yellow-negative))",
            color: "var(--color-white)",
            border: "1px solid var(--color-light-gray)",
          },
        }}
      />
      <Theme radius="none" accentColor="teal">
        <App />
      </Theme>
    </QueryClientProvider>
  </React.StrictMode>
);
