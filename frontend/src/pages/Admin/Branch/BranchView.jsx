import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../../../Context/Main";
import { IoLocation } from "react-icons/io5";

export default function BranchView() {
    const { fetchBranches, API_BASE_URL, Admin_Url, branches, branchImg } = useContext(Context);
    useEffect(
        () => {
            fetchBranches()
        }, []
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
                                    to="/admin/branch"
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Branch
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Hero Section */}
            <div className="relative h-72 w-full">
                <img
                    src="/images/123.avif"
                    alt="Branch Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white">
                    <h1 className="text-3xl font-bold">Visit Us At Los Angeles Locations</h1>
                    <p className="mt-2">1607 Columbia Road Aurora, Smith Street West CO 80014</p>
                    <a
                        href="https://goo.gl/maps/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600"
                    >
                        Get Direction
                    </a>
                </div>
            </div>
            <div className='flex items-center justify-between p-5'>
                <div className='font-bold'>All Branches List</div>
                <Link to={'/admin/branch/add'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-10 py-2">
                    Add
                </Link>
            </div>
            {/* Branch Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">

                {branches.map((branch) => (
                    <div
                        key={branch._id}
                        className="bg-white flex flex-col gap-2 rounded-lg shadow hover:shadow-lg transition duration-300"
                    >
                        <img
                            src={"https://restaurant-backend-7qbj.onrender.com" + branchImg + "/" + branch.image}
                            alt={branch.name}
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4 flex flex-col gap-2 ">
                            <div className="text-sm text-gray-700 font-semibold ">{branch.name}</div>
                            <div className="flex items-center text-yellow-500 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`${i < Math.round(branch.rating) ? "fill-current" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                                <span className="ml-2 text-gray-600">{branch.rating}</span>
                            </div>
                            <p className="text-sm flex gap-2"> <IoLocation className="text-gray-600" fontSize={20} /> {branch.address.city} {branch.address.address} {branch.address.state}</p>
                            <p className="text-sm text-gray-500">{branch.contact.phone}</p>

                            <Link
                                to={`/branchlogin`} // ✅ Correct way
                                target="_blank"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center px-10 py-2 mt-2"
                            >
                                Branch Login
                            </Link>


                        </div>
                    </div>
                ))}
            </div>

            {/* Map Section */}
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Get Direction</h2>

                <iframe
                    title="Map"
                    className="w-full h-60 rounded-lg border"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.607644218191!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db1c407c17247%3A0x5cf3b708beaa14cb!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1690000000000"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div >
    );
}
