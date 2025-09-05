// import Dashboard from '../pages/manager/Dashboard'

import CategoriesAdd from "../components/Categories/CategoriesAdd";
import CategoriesView from "../components/Categories/CategoriesView";
import ItemsAdd from "../components/Item/ItemsAdd";
import ItemsView from "../components/Item/ItemsView";
import { ProtectRestro } from "../components/ProtectedRoutes";
import RestroLayout from "../pages/Layouts/RestroLayout";
import PosOrder from "../pages/Restro/POS Order/PosOrder";
import POSView from "../pages/Restro/POS/POSView";
import RestroDashboard from "../pages/Restro/RestroDashboard";
import TableView from "../pages/Restro/Tables/TablesView";

export const RestroRoutes = {
  path: "/restro",
  element: <ProtectRestro> <RestroLayout /></ProtectRestro>,
  children: [
    { path: "", element: <RestroDashboard /> },
    { path: "categories", element: <CategoriesView /> },
    { path: "categories/add", element: <CategoriesAdd /> },
    { path: "items", element: <ItemsView /> },
    { path: "items/add", element: <ItemsAdd /> },
    { path: "tables", element: <TableView /> },
    { path: "restroPOS", element: <POSView /> },
    { path: "posorder", element: <PosOrder /> }

  ]
}
