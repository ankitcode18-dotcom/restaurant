import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Context } from '../../Context/Main';

export default function ItemsView() {
    const { fetchItems, items, branchData, itemsImg, API_BASE_URL, restroData } = useContext(Context);
    const [loading, setLoading] = useState(false);
    console.log(items);


    useEffect(() => {
        if (branchData) {
            fetchItems(branchData._id ?? null);
        }
        else if (restroData) {
            fetchItems(restroData.branchId ?? null);
        }
    }, [branchData?._id]);

    if (loading) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="p-4">
            <div className='flex items-center justify-between p-5'>
                <div className='font-bold text-xl'>All Menu</div>
                <Link to={'add'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2">
                    Add
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Photo</th>
                            <th className="px-4 py-2 border">Product Name</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Price</th>
                            <th className="px-4 py-2 border">Rating</th>
                            <th className="px-4 py-2 border">Food Type</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id} className=" hover:bg-gray-50">
                                {/* Image */}
                                <td className="border px-4 py-2">
                                    <img
                                        src={`${API_BASE_URL}${itemsImg}/${item.image}`}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>

                                {/* Product Name */}
                                <td className="border px-4 py-2 font-semibold">
                                    {item.name}
                                    <div className="text-gray-500 text-sm">{item.size || "-"}</div>
                                </td>

                                {/* Description */}
                                <td className="border px-4 py-2 text-gray-600">
                                    {item.description?.slice(0, 80)}...
                                </td>

                                {/* Price */}
                                <td className="border px-4 py-2 font-bold text-green-600">
                                    ₹{item.price}
                                </td>

                                {/* Rating */}
                                <td className="border px-4 py-2">
                                    ⭐ {item.rating || "4.0"}/5
                                </td>
                                <td className="border px-4 py-2">
                                    {item.foodType == "Veg" ? (
                                        <span className="px-2 py-1 flex justify-center items-center text-base bg-green-100 text-green-600 rounded">Veg</span>
                                    ) : (
                                        <span className="px-2 py-1 text-base flex justify-center items-center bg-red-100 text-red-600 rounded">Non-Veg</span>
                                    )}
                                </td>
                                {/* Food Type (Active/Inactive) */}
                                <td className="border px-4 py-2">
                                    {item.status ? (
                                        <span className="px-2 py-1 flex justify-center items-center text-base bg-blue-100 text-blue-600 rounded">Active</span>
                                    ) : (
                                        <span className="px-2 py-1 text-base flex justify-center items-center bg-yellow-100 text-yellow-600 rounded">Inactive</span>
                                    )}
                                </td>

                                {/* Action Buttons */}
                                <td className="border px-4 py-8 space-x-3 flex justify-center ">
                                    <Link className="text-blue-500 hover:text-blue-700 ">
                                        <Eye size={18} />
                                    </Link>
                                    <Link className="text-yellow-500 hover:text-yellow-700">
                                        <Pencil size={18} />
                                    </Link>
                                    <Link className="text-red-500 hover:text-red-700">
                                        <Trash2 size={18} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
