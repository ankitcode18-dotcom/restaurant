import MenuAdd from '../components/MenuCard/MenuAdd'
import MenuView from '../components/MenuCard/MenuView'
import { AdminProtected } from '../components/ProtectedRoutes'
import BranchAdminView from '../pages/Admin/Branch Admin/BranchAdminView'
import BranchAdd from '../pages/Admin/Branch/BranchAdd'
import BranchView from '../pages/Admin/Branch/BranchView'
import Dashboard from '../pages/Admin/Dashboard'
import AdminLayout from '../pages/Layouts/AdminLayout'


export const adminRoutes = {
    path: "/admin",
    element: <AdminProtected> <AdminLayout /></AdminProtected>,
    children: [
        { path: "", element: <Dashboard /> },
        { path: "branch", element: <BranchView /> },
        { path: "branch/add", element: <BranchAdd /> },
        { path: "branch-admin", element: <BranchAdminView /> },
        { path: 'menu', element: <MenuView /> },
        { path: 'menu/add', element: <MenuAdd /> }
    ]
}

