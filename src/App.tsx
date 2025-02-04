import { Refine, Authenticated } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ListProducts } from "./pages/products/list";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
      >
        <Routes>
          <Route
            element={
              // We're wrapping our routes with the `<Authenticated />` component
              // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
              // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            <Route index element={<ListProducts />} />
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                <Navigate to="/" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}