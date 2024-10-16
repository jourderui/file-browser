import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useRouteError,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ErrorPage from "../components/Error/ErrorPage";
import { App } from "../components/App/App";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <Layout>
      <ErrorPage />
    </Layout>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route path="*" element={<App />} />
      </Route>
    </>
  )
);
