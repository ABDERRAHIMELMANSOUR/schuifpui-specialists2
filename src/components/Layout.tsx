import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Seo from "./Seo";
import WhatsAppButton from "./WhatsAppButton";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Seo />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Layout;
