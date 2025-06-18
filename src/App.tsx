
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import TodaySales from "./pages/TodaySales";
import MonthlySales from "./pages/MonthlySales";
import YearlySales from "./pages/YearlySales";
import Export from "./pages/Export";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <Layout>
                <Products />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/today-sales" element={
            <ProtectedRoute>
              <Layout>
                <TodaySales />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/monthly-sales" element={
            <ProtectedRoute>
              <Layout>
                <MonthlySales />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/yearly-sales" element={
            <ProtectedRoute>
              <Layout>
                <YearlySales />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/export" element={
            <ProtectedRoute>
              <Layout>
                <Export />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
