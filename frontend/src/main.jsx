import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <App />
            <Toaster position="top-right"/>
        </AuthProvider>
      
    </QueryClientProvider>
  </React.StrictMode>,
)
