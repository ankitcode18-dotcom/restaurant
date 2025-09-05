import { Navigate, useParams } from "react-router-dom";
import BranchAdminLayout from "../pages/Layouts/BranchAdminLayout";
import BranchDashboard from "../pages/Branch/BranchDashboard";
import TableView from "../pages/Branch/BranchTables/TablesView";
import RestroView from "../pages/Branch/Resto/RestroView";
import RestroAdd from "../pages/Branch/Resto/RestroAdd";
import { ProtectBranch } from "../components/ProtectedRoutes";
import MenuView from "../components/MenuCard/MenuView";
import MenuAdd from "../components/MenuCard/MenuAdd";
import CategoriesView from "../components/Categories/CategoriesView";
import CategoriesAdd from "../components/Categories/CategoriesAdd";
import ItemsView from "../components/Item/ItemsView";
import ItemsAdd from "../components/Item/ItemsAdd";


export const branchAdminRouter = {
    path: "/branch", // ✅ include param here
    element: <ProtectBranch><BranchAdminLayout /></ProtectBranch>,
    children: [
        { path: "", element: <BranchDashboard /> },
        { path: "branch-menu", element: <MenuView /> },
        { path: "branch-menu/add", element: <MenuAdd /> },
        { path: "categories", element: <CategoriesView /> },
        { path: "categories/add", element: <CategoriesAdd /> },
        { path: "items", element: <ItemsView /> },
        { path: "items/add", element: <ItemsAdd /> },
        { path: "tables", element: <TableView /> },
        { path: "restro", element: <RestroView /> },
        { path: "restro/add", element: <RestroAdd /> },

    ]
};
