import { createBrowserRouter, Navigate, RouterProvider, useParams } from 'react-router-dom';
import { CafeRoutes } from './routes/CafeRoutes';
import { RestroRoutes } from './routes/RestroRoutes';
import { adminRoutes } from './routes/AdminRoutes';
import { branchAdminRouter } from './routes/BranchAdmin';
import BranchLogin from './pages/Branch/BranchLogin';
import AdminLogin from './pages/Admin/AdminLogin';
import { AdminPublic, PublicBranch, PublicRestro, RestaurantPublic } from './components/PublicRoutes';
import RestroLogin from './pages/Restro/RestroLogin';
import Restaurant from './pages/Restaurant';
import RestaurantLogin from './pages/RestaurantLogin';
import { useDispatch } from 'react-redux';
import { lsToCart } from './reducers/Cart';
import { useEffect } from 'react';
import RestaurantOrder from './pages/RestaurantOrder.jsx';
import RestaurantLayout from './pages/Layouts/RestaurantLayout';
import RestaurantorderHistory from './pages/RestaurantorderHistory.jsx';

export default function App() {
  const dispatcher = useDispatch()

  useEffect(
    () => {
      dispatcher(lsToCart())
    }, []
  )

  const routes = createBrowserRouter([
    // Admin Router
    adminRoutes,

    //  Branch Admin Router
    branchAdminRouter,

    // Restro Router
    RestroRoutes,

    CafeRoutes,

    // Default Admin Login
    {
      path: "/login",
      element: <AdminPublic> <AdminLogin /></AdminPublic>
    },
    //  Branch Admin Login
    {
      path: "/branchlogin",
      element: <PublicBranch> <BranchLogin /></PublicBranch>
    },

    //  Restaurant  Login
    {
      path: "/restrologin",
      element: <PublicRestro> <RestroLogin /></PublicRestro>
    },

    {
      path: "/restaurant",
      element: <RestaurantLayout />,
      children: [
        {
          path: "/restaurant",
          element: <Restaurant />
        },
        {
          path: "order",   // 👈 yaha sirf "order"
          element: <RestaurantOrder />
        },
        {
          path: 'orderHistory',
          element:<RestaurantorderHistory />
        }
      ]
    },

    {
      path: "/restaurant-login",
      element: <RestaurantPublic> <RestaurantLogin /></RestaurantPublic>
    }

    // {
    //   path: "/:branchId?",
    //   element: <RestroLogin />
    // },


  ]);



  return (
    <RouterProvider router={routes} />
  );
}


