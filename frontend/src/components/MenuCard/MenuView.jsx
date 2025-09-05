// src/pages/MenuView.jsx
import React from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../Context/Main";
import { useEffect } from "react";

export default function MenuView() {
    const { fetchMenu, branch_Id, menu, menuImg, Menu_url, API_BASE_URL } = useContext(Context)


    useEffect(
        () => {
            if (branch_Id) {
                fetchMenu(branch_Id)
            }
            fetchMenu()
        }, [branch_Id]
    )

    return (
        <div className="flex-1 overflow-hidden">

            <div className="flex px-8  py-5 justify-between items-center">
                <nav className="flex " aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link
                                to='/admin'
                                className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3 me-2.5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <Link
                                    to="/admin/menu"
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Menu
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className='flex items-center justify-between p-5'>
                <div className='font-bold'>All Menu</div>
                <Link to={branch_Id ? 'add' : '/admin/menu/add'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-10 py-2">
                    Add
                </Link>
            </div>




            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {menu.map((menu, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg overflow-hidden border"
                    >
                        <img
                            src={`${"http://localhost:5000"}${menuImg}/${menu.image}`}
                            alt={menu.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-3xl font-semibold">{menu.name}</h3>

                            {/* Branch Name / All Restaurant */}
                            <p className="text-sm text-gray-500 mt-1">
                                {menu.branchId
                                    ? menu.branchId.name || "Unnamed Branch"
                                    : "All Restaurant"}
                            </p>

                            <p className="mt-2 text-gray-600">
                                <span className="text-gray-900 font-semibold">Visit Us Today! :</span> {menu.description}
                            </p>
                            <div className="flex justify-end mt-3 space-x-2">
                                <button className="text-blue-500 hover:text-blue-700">✏️</button>
                                <button className="text-red-500 hover:text-red-700">🗑️</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}