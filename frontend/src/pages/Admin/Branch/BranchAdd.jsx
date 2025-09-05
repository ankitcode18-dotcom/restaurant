import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../../Context/Main";

export default function BranchAdd() {
    const { API_BASE_URL, notify } = useContext(Context);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("name", e.target.name.value.trim());
            formData.append("branchId", e.target.branchId.value.trim());
            formData.append("password", e.target.password.value.trim());
            if (imageFile) formData.append("image", imageFile);
            formData.append("rating", e.target.rating.value);
            formData.append("address.street", e.target.street.value.trim());
            formData.append("address.city", e.target.city.value.trim());
            formData.append("address.state", e.target.state.value.trim());
            formData.append("address.pincode", e.target.pincode.value.trim());
            formData.append("contact.phone", e.target.phone.value.trim());
            formData.append("contact.email", e.target.email.value.trim());
            formData.append("isActive", e.target.status.value === "active");

            const res = await axios.post(`${API_BASE_URL}/branch/create`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.status === 1) {
                e.target.reset();
                setSelectedImage(null);
                setImageFile(null);
                notify(res.data.msg, res.data.status)
            } else {
                notify(res.data.msg || "Something went wrong!");
            }
        } catch (err) {
            notify(err.response?.data?.message || "Server error! Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 overflow-hidden">
            <div className="px-8 py-5">
                <h2 className="text-2xl font-bold text-gray-800">Add New Branch</h2>
            </div>

            <form
                onSubmit={submitHandler}
                className="bg-white shadow-lg rounded-xl p-6 space-y-5"
                encType="multipart/form-data"
            >
                {/* Branch Name */}
                <div>
                    <label className="block font-semibold mb-1">Branch Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Branch ID */}
                <div>
                    <label className="block font-semibold mb-1">Branch ID</label>
                    <input
                        type="text"
                        name="branchId"
                        required
                        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-semibold mb-1">Branch Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border rounded-lg p-2 w-full"
                    />
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="mt-3 w-40 h-28 object-cover rounded-lg shadow"
                        />
                    )}
                </div>

                {/* Rating */}
                <div className="mb-4">
                    <label className="block font-bold">Rating</label>
                    <input type="number" name="rating" min="0" max="5" step="0.1" defaultValue="0" className="border rounded p-2 w-full" />
                </div>

                {/* Address */}
                <div>
                    <label className="block font-semibold mb-1">Street</label>
                    <input
                        type="text"
                        name="street"
                        required
                        className="border rounded-lg p-2 w-full"
                    />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block font-semibold mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            required
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">State</label>
                        <input
                            type="text"
                            name="state"
                            required
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            required
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <label className="block font-semibold mb-1">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        required
                        className="border rounded-lg p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="border rounded-lg p-2 w-full"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block font-semibold mb-1">Status</label>
                    <select
                        name="status"
                        className="border rounded-lg p-2 w-full"
                        defaultValue="active"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                    <button
                        disabled={isSubmitting}
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 px-36 py-3 rounded-lg hover:opacity-90 transition"
                    >
                        {isSubmitting ? "Adding..." : "Add Branch"}
                    </button>
                </div>
            </form>
        </div>
    );
}
