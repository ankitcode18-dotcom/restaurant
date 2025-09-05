import React, { useContext, useEffect, useRef, useState } from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { TfiControlForward } from "react-icons/tfi";
import { TiUser } from "react-icons/ti";
import { IoIosColorPalette } from "react-icons/io";
import { IoBagHandle } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
import { Context } from '../../Context/Main';
export default function BranchSideBar() {
    const admin = useSelector(store => store.admin);
    const navigator = useNavigate();
    const dispatcher = useDispatch()

    const AUTO_LOGOUT = 1 * 60 * 60 * 1000 // 1 min 

    //                hrs * min * sec * millisec


    const [isActive, setIsActive] = useState(true);
    const history = useLocation();
    const timeoutRef = useRef();

    useEffect(() => {

        const handleActivity = () => {
            setIsActive(true);
            resetTimeout();
        };

        const handleLogout = () => {
            dispatcher(logout());
            // navigator("/admin/login");
        };

        const resetTimeout = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // Set a new timeout for auto logout
            timeoutRef.current = setTimeout(() => {
                handleLogout();
            }, AUTO_LOGOUT);
        };

        // Add event listeners for user activity
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);
        window.addEventListener("click", handleActivity);

        // Initial reset of the timeout
        resetTimeout();

        // Cleanup function
        return () => {
            clearTimeout(timeoutRef.current);
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            window.removeEventListener("click", handleActivity);
        };
    }, []);


    useEffect(
        () => {
            const lsAdmin = localStorage.getItem("admin")
            const lsToken = localStorage.getItem("token")
            if (lsAdmin && lsToken) {
                // dispatcher(login({ admin: JSON.parse(lsAdmin), token: lsToken }))
            }
        }, []
    )

    useEffect(
        () => {
            const lsAdmin = localStorage.getItem("admin")
            if (admin?.data == null && lsAdmin == null) {
                // navigator("/admin/login");
            }
        }, [admin?.data]
    )

    const menu = [
        {
            group_name: '',
            items: [
                {
                    name: 'Dashboard',
                    icon: <TbLayoutDashboardFilled />,
                    url: `/branch`,
                    display: true
                },
            ]
        },
        {

            group_name: 'general',
            items: [
                {
                    name: 'Menu',
                    icon: <MdOutlineSystemSecurityUpdateGood />,
                    url: `/branch/branch-menu`,
                    display: true
                },
                {
                    name: 'Categories',
                    icon: <FaClipboardList />,
                    url: `/branch/categories`,
                    display: true
                },
                {
                    name: 'Items',
                    icon: <FaClipboardList />,
                    url: `/branch/items`,
                    display: true
                },
                {
                    name: 'Restro',
                    icon: <IoIosColorPalette />,
                    url: `/branch/restro`,
                    display: true
                },

            ]
        },
        {
            group_name: 'users',
            items: [
                {
                    name: 'Tables',
                    icon: <TiUser />,
                    url: `/branch/tables`,
                    display: true
                }
            ]
        },
        {
            group_name: 'orders',
            items: [
                {
                    name: 'Orders',
                    icon: <IoBagHandle />,
                    url: `/branch/branch-order`,
                    display: true
                },
                {
                    name: 'Transactions',
                    icon: <GrTransaction />,
                    url: `/branch/branch-transaction`,
                    display: true
                },
            ]
        }
    ]

    return (
        <div className='bg-white box-border min-h-[100vh] fixed top-16 left-0'>
            <ul>
                {
                    menu?.map(
                        (g, i) => {
                            return <React.Fragment key={i}>
                                <b className='py-1 px-3 block text-xs uppercase pt-5  text-[#9097a7]'>{g.group_name}</b>
                                {
                                    g.items?.map(
                                        (m, i) => {
                                            return <li key={i} style={{
                                                display: m.display == true ? "block" : "none"
                                            }} className='my-1   py-2 font-semibold text-[#9097a7]  hover:text-gray-900' >
                                                <Link to={m.url} className='flex px-[32px] gap-2 items-center'>
                                                    {m.icon}{m.name}
                                                </Link>
                                            </li>
                                        }
                                    )
                                }

                            </React.Fragment>
                        }
                    )
                }
            </ul>
        </div>
    )
}

