import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Layout from "../layout/Layout";

const Dashboard = React.lazy(() => import("../../pages/dashboard/Dashboard"));
const AnotherSection = React.lazy(() => import("../../pages/crypto/CryptoTransactions"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/cryptoTransactions",
        element: (
          <Suspense>
            <AnotherSection />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
