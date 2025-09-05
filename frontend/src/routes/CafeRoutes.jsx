import { Outlet } from 'react-router-dom'
// import SeatBooking from '../pages/user/SeatBooking'
import CafeLayout from '../pages/Layouts/CafeLayout'

export const CafeRoutes = {
    path: "/branch/:branchId/:table?",
    element: <CafeLayout />,
    children: [
        // { path: "", element: <CafeHome /> },
        // { path: "seat-booking", element: <SeatBooking /> },
    ]
}
