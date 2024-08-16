import React from "react";
import ReactDOM from "react-dom/client";
import router from "./app/routes/router";
import { RouterProvider } from "react-router";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
