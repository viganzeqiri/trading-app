import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import useAuthRedirects from "../hooks/useAuthRedirect";

export default function Root() {
  useAuthRedirects();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
