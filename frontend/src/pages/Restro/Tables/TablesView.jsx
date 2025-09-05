import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/Main";

export default function TableView() {
    const { branch_Id, table, fetchTables } = useContext(Context)
    const [formData, setFormData] = useState({
        name: "",
        size: "",
        status: "available",
    });
    console.log(table);



    useEffect(
        () => {
            fetchTables(branch_Id)
        }, [branch_Id]
    )

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!branch_Id) {
            return alert('User do not found')
        }
        try {
            const res = await axios.post("https://restaurant-backend-7qbj.onrender.com/table/create-table", {
                ...formData,
                branchId: branch_Id
            })
            fetchTables(branch_Id)
        } catch (error) {

        }
    };

    const handleDelete = (id) => {
        setTables(table.filter((table) => table.id !== id));
    };

    return (
        <div className="p-6">
            {/* Form */}
            <h2 className="text-xl font-bold mb-4">Add Dining Table</h2>
            <form
                onSubmit={handleSubmit}
                className="grid gap-4 bg-white shadow p-4 rounded-xl w-full md:w-1/2"
            >
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Table Name"
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="Table Size"
                    required
                    className="border p-2 rounded"
                />
                <select
                    name="status"
                    value={formData.status.toLocaleLowerCase()}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            {/* Table List */}
            <h2 className="text-xl font-bold mt-8 mb-4">Your Dining Tables</h2>
            <table className="w-full border-collapse border text-left">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Size</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {table?.map((table) => (
                        <tr key={table._id}>
                            <td className="border p-2">#{table._id.slice(-5)}</td>
                            <td className="border p-2">{table.name}</td>
                            <td className="border p-2">{table.size}</td>
                            <td className="border p-2">  <img src={table.qrCode} alt="QR Code" /></td>
                            <td className="border p-2">
                                <button
                                    onClick={() => handleDelete(table.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {table?.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center p-4 text-gray-500">
                                No dining tables added yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
