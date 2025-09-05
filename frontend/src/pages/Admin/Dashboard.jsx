import React from "react";
import { IoBagHandle } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiStore2Line } from "react-icons/ri";

export default function Dashboard() {
    const branchStats = [
        {
            branch: "Yummy Door - Connaught Place",
            orders: 120,
            revenue: "₹85,000",
            customers: 56
        },
        {
            branch: "Yummy Door - Noida Sector 18",
            orders: 95,
            revenue: "₹70,500",
            customers: 44
        }
    ];

    return (
        <div className="flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                        <RiStore2Line size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Branches</p>
                        <h2 className="text-lg font-bold">8</h2>
                    </div>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <IoBagHandle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <h2 className="text-lg font-bold">2,430</h2>
                    </div>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                        <MdOutlineAttachMoney size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <h2 className="text-lg font-bold">₹5,80,000</h2>
                    </div>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                        <BsPeopleFill size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Customers</p>
                        <h2 className="text-lg font-bold">1,245</h2>
                    </div>
                </div>
            </div>

            {/* Branch Stats Table */}
            <div className="p-6">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left">Branch</th>
                                <th className="py-3 px-4 text-left">Orders</th>
                                <th className="py-3 px-4 text-left">Revenue</th>
                                <th className="py-3 px-4 text-left">Customers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branchStats.map((b, i) => (
                                <tr key={i} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">{b.branch}</td>
                                    <td className="py-3 px-4">{b.orders}</td>
                                    <td className="py-3 px-4">{b.revenue}</td>
                                    <td className="py-3 px-4">{b.customers}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                    Add Branch
                </button>
                <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    View Admins
                </button>
                <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    View Managers
                </button>
            </div>
        </div>
    );
}
