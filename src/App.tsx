import { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Diensten from "./pages/Diensten";
import DienstDetail from "./pages/DienstDetail";
import Werkgebieden from "./pages/Werkgebieden";
import WerkgebiedDetail from "./pages/WerkgebiedDetail";
import Beoordelingen from "./pages/Beoordelingen";
import OverOns from "./pages/OverOns";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Providers rond de app. Los van de router zodat de browser een
 * `BrowserRouter` kan gebruiken en de prerender een `StaticRouter`.
 */
export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {children}
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

/**
 * Alle routes van de site. Elke route hier moet ook in `src/lib/routes.ts`
 * staan, anders wordt er geen statische HTML voor gegenereerd en krijgt de
 * bezoeker (terecht) een 404.
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/diensten" element={<Diensten />} />
    <Route path="/diensten/:slug" element={<DienstDetail />} />
    <Route path="/werkgebieden" element={<Werkgebieden />} />
    <Route path="/werkgebieden/:slug" element={<WerkgebiedDetail />} />
    <Route path="/beoordelingen" element={<Beoordelingen />} />
    <Route path="/over-ons" element={<OverOns />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
