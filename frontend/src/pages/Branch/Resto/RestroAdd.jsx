import React, { useContext, useState } from "react";
import { Context } from "../../../Context/Main";
import axios from "axios";

export default function RestroAdd({ onSubmit }) {
    const { menu, BRANCHADMIN, API_BASE_URL, branchData, fetchMenu, fetchCategorie, categories } =
        useContext(Context);

    const [data, setFormData] = useState({
        name: "",
        restroId: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.restroId || !data.name || !data.password) {
            alert("Enter all fields");
            return;
        }
        try {
            const res = await axios.post(
                API_BASE_URL + BRANCHADMIN + '/create-restro',
                {
                    name: data.name,
                    restroId: data.restroId,
                    branchId: branchData?._id,
                    password: data.password,
                },
                { headers: { "Content-Type": "application/json" } }
            );
            alert("Restro added successfully!");
        } catch (error) {
            alert(error.response?.data?.msg || "Something went wrong!");
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Restaurant Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter restaurant name"
                        value={data.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                        required
                    />
                </div>

                {/* RestroId */}
                <div>
                    <label className="block text-sm font-medium mb-1">Restaurant ID</label>
                    <input
                        type="text"
                        name="restroId"
                        placeholder="Enter unique ID"
                        value={data.restroId}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={data.password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                        required
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Add Restaurant Login
                </button>
            </form>
        </div>
    );
}
