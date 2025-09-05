import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../Context/Main";

export default function ItemsAdd() {
    const { menu, BRANCHADMIN, API_BASE_URL, branchData, fetchMenu, fetchCategorie, categories } =
        useContext(Context);

    useEffect(() => {
        if (branchData) {
            fetchMenu(branchData?._id ?? null);
        }
    }, [branchData?._id]);

    const [formData, setFormData] = useState({
        name: "",
        menuId: "",
        categoryId: "",
        price: "",
        description: "",
        foodType: "veg", // ✅ default veg
        image: null,
    });

    // Form data update karna
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });

            if (name === "menuId") {
                setFormData({ ...formData, menuId: value, categoryId: "" });
                fetchCategorie(value); // ✅ Load categories of selected menu
            }
        }
    };

    // Submit karna
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("menuId", formData.menuId);
            data.append("branchId", branchData?._id);
            data.append("categoriesId", formData.categoryId);
            data.append("price", formData.price);
            data.append("description", formData.description);
            data.append("foodType", formData.foodType); // ✅ veg / nonveg

            if (formData.image) {
                data.append("image", formData.image);
            }

            await axios.post(
                API_BASE_URL + BRANCHADMIN + `/create-items`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("Item added successfully!");

            // Form reset
            setFormData({
                name: "",
                menuId: "",
                categoryId: "",
                price: "",
                description: "",
                foodType: "veg",
                image: null,
            });
        } catch (error) {
            console.error(error);
            alert("Error adding item");
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Item Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

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

                {/* Category Select (Dynamic based on Menu) */}
                {formData.menuId && (
                    categories.length > 0 ? (
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div className="p-2 text-sm text-gray-500 border rounded bg-gray-50">
                            No categories found for this menu ❌
                        </div>
                    )
                )}

                {/* Price */}
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                ></textarea>

                {/* Food Type (Veg / Non-Veg) */}
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="foodType"
                            value="Veg"
                            checked={formData.foodType === "Veg"}
                            onChange={handleChange}
                        />
                        <span>Veg</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="foodType"
                            value="Non-Veg"
                            checked={formData.foodType === "Non-Veg"}
                            onChange={handleChange}
                        />
                        <span>Non-Veg</span>
                    </label>
                </div>

                {/* Image */}
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
}
