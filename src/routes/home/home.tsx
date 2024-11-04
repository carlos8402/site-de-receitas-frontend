import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavBar } from "../../components/nav-bar";
import { Footer } from "../../components/footer/footer";

export function Home() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
