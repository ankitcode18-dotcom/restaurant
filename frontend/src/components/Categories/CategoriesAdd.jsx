import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Context } from "../../Context/Main";

export default function CategoriesAdd() {
    const { API_BASE_URL, BRANCHADMIN, menu, branchData } = useContext(Context)
    const [formData, setFormData] = useState({
        name: "",
        image: null,
        menuId: "",
    });

    // const menu = ["Non Veg Menu", "Fast Food Menu", "Starter", "Desserts"];

    // useEffect(
    //     () => {
    //         fetchMenu()
    //     }, []
    // )

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // FormData object banao
            const form = new FormData();
            form.append("name", formData.name);
            form.append("menuId", formData.menuId);
            form.append("branchId", branchData._id);
            if (formData.image) {
                form.append("image", formData.image); // file upload
            }

            // API call
            const res = await axios.post(
                API_BASE_URL + BRANCHADMIN + `/create-categories`,
                form,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("Category Added Successfully ✅");

            // Form reset
            setFormData({
                name: "",
                image: null,
                menuId: "",
            });
        } catch (error) {
            console.error(error);
            alert("Error adding category ❌");
        }
    };
    return (
        <div className="p-6 bg-white rounded-2xl shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Add New Category</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category Name */}
                <div>
                    <label className="block text-sm font-medium mb-2">Category Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter category name"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>


                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-2">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:outline-none"
                    />
                    {formData.image && (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            className="mt-3 w-20 h-20 object-cover rounded-lg border"
                        />
                    )}
                </div>

                {/* Menu Select */}
                <div>
                    <label className="block text-sm font-medium mb-2">Select Menu</label>
                    {/* Menu Select */}
                    <select
                        name="menuId"
                        value={formData.menuId}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Select Menu</option>
                        {menu.map((menu) => (
                            <option key={menu._id} value={menu._id}>
                                {menu.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                {/* <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Min Price</label>
                        <input
                            type="number"
                            name="minPrice"
                            value={formData.minPrice}
                            onChange={handleChange}
                            placeholder="e.g. 10"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Max Price</label>
                        <input
                            type="number"
                            name="maxPrice"
                            value={formData.maxPrice}
                            onChange={handleChange}
                            placeholder="e.g. 30"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                </div> */}

                {/* Submit */}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Add Category
                </button>
            </form>
        </div>
    );
}
