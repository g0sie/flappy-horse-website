import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import { Separator } from "@/components/ui/separator";

import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Separator />
      <main className="page">
        <Outlet />
      </main>
      <Separator />
      <Footer />
    </div>
  );
};

export default Layout;
