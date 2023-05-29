import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./routes/Register";
import Root from "./routes/Root";
import SignIn from "./routes/SignIn";
import Trade from "./routes/Trade";

import ErrorPage from "./components/ErrorPage";

import { store } from "./app/store";
import { Provider } from "react-redux";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      { path: "/app", element: <Trade /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
