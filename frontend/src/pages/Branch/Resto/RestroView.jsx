import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/Main';
import axios from 'axios';

export default function RestroView() {
    const { API_BASE_URL, branchData, BRANCHADMIN } = useContext(Context);
    const [restros, setRestros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // fetch restros
    const fetchRestros = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(API_BASE_URL + BRANCHADMIN + `/restro/${branchData._id}`);
            setRestros(res.data.restro);
            console.log(res.data.restro);

        } catch (err) {
            setError(err.response?.data?.message || "Failed to load restros ❌");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (branchData?._id) {
            fetchRestros();
        }
    }, [branchData]);


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

            <div className='flex items-center justify-between p-5'>
                <div className='font-bold'>All Branches List</div>
                <Link to='add' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-10 py-2">
                    Add
                </Link>
            </div>


            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Restaurant List</h2>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Restro ID</th>
                            <th className="p-2 border">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restros.length > 0 ? (
                            restros.map((r) => (
                                <tr key={r._id} className="text-center">
                                    <td className="p-2 border">{r.name}</td>
                                    <td className="p-2 border">{r.restroId}</td>
                                    <td className="p-2 border">
                                        {new Date(r.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-2 border text-center" colSpan="4">
                                    No restaurants found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>




        </div>
    )
}
