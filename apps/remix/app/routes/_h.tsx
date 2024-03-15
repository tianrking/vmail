import { Outlet } from "@remix-run/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HomeLayout() {
  return (
    <div className="mx-auto flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
