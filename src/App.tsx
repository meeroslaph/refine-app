import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ListProducts } from "./pages/products/list";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<Login />}
      >
        <Header />
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}