import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../../Context/Main";


export default function CategoriesView() {
    const { fetchCategorie, branchData, restroData, categories, catImg, BRANCHADMIN, API_BASE_URL } = useContext(Context)


    useEffect(() => {
        if (branchData) {
            fetchCategorie(branchData?._id ?? null);
        } else if (restroData?.branchId) {
            fetchCategorie(restroData?.branchId ?? null);
        }
    }, [branchData?._id, restroData?.branchId]);


    return (
        <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Branch Categories</h2>
            <div className='flex items-center justify-between p-5'>
                <div className='font-bold'>All Menu</div>
                <Link to={'add'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-10 py-2">
                    Add
                </Link>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">Categories ID</th>
                        <th className="p-3">Categories Photo</th>
                        <th className="p-3">Categories Name</th>
                        <th className="p-3">Price Range</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((cat) => (
                        <tr key={cat?._id} className="border-b hover:bg-gray-50">
                            <td className="p-3">#{cat?._id.slice(-5)}</td>
                            <td className="p-3">
                                <img src={API_BASE_URL + catImg + `/${cat?.image}`} alt={cat?.name} className="w-12 h-12 rounded-full object-cover" />
                            </td>
                            <td className="p-3 text-blue-600 font-medium cursor-pointer hover:underline">
                                {cat?.name}
                            </td>
                            <td className="p-3">₹{cat?.min_Price} to ₹{cat?.max_Price}</td>
                            <td className="px-6 py-4">
                                <div className="flex justify-start">
                                    {cat?.status ? (
                                        <button
                                            onClick={() => changeStatus(cat?._id, false)}
                                            className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition"
                                        >
                                            Active
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => changeStatus(cat?._id, true)}
                                            className="px-3 py-1 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition"
                                        >
                                            Inactive
                                        </button>
                                    )}
                                </div>
                            </td>

                            <td className="p-3 flex items-center gap-3">
                                <Eye className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
                                <Edit className="w-5 h-5 cursor-pointer text-gray-600 hover:text-yellow-600" />
                                <Trash2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-600" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
