import axios from "axios";
import React, { useState, useRef } from "react";
import { generateSlug } from "../../library copy";
import { useContext } from "react";
import { Context } from "../../Context/Main";

export default function MenuAdd() {
    const { API_BASE_URL, Menu_url, branchData } = useContext(Context)
    const [menu, setMenu] = useState({
        name: "",
        slug: "",
        image: "",
        description: "",

    });

    const slugRef = useRef();

    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Slug generate karne wala function
    const getSlug = (name) => {
        const slug = generateSlug(name);
        setMenu(prev => ({ ...prev, slug }));
        if (slugRef.current) slugRef.current.value = slug;
    };

    // Handle Image Upload with preview and simulated upload progress
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please upload a valid image file");
            return;
        }

        setError("");
        setIsLoading(true);
        setUploadProgress(0);

        // Create preview URL
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);

        // Simulate upload progress
        const simulateUpload = () => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setIsLoading(false);
                }
            }, 300);
        };

        simulateUpload();

        setMenu((prev) => ({ ...prev, image: file }));
    };

    // Text input change handler (including name & title & others)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenu((prev) => ({ ...prev, [name]: value }));

        if (name === "name") {
            getSlug(value);
        }
    };

    
    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !menu.name.trim() ||
            !menu.slug.trim() ||
            !menu.image ||
            !menu.description.trim()
        ) {
            setError("Please fill all fields and upload an image");
            return;
        }
        setError("");


        // Prepare form data for sending file
        const formData = new FormData();
        formData.append("name", menu.name);
        formData.append("slug", menu.slug);
        if(branchData){
            formData.append("branchId", branchData._id);
        }
        formData.append("description", menu.description);
        formData.append("image", menu.image); // file object

        try {
            const res = await axios.post(API_BASE_URL  + Menu_url + "/create-menu", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });
            // Reset form if needed
            setMenu({
                name: "",
                slug: "",
                image: "",
                description: ""
            });
            setSelectedImage(null);
            setUploadProgress(0);
            if (slugRef.current) slugRef.current.value = "";
        } catch (error) {
            setError("Failed to submit form");
            console.error(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 border rounded shadow my-10 bg-white">
            <h2 className="text-3xl font-semibold mb-6 text-center">Add New Menu</h2>

            {error && (
                <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" encType="multipart/form-data">
                <input
                    type="text"
                    name="name"
                    value={menu.name}
                    onChange={handleChange}
                    placeholder="Menu Title"
                    className="border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="slug"
                    ref={slugRef}
                    value={menu.slug}
                    readOnly
                    placeholder="Slug"
                    className="border p-3 rounded bg-gray-100"
                />

                <label className="block text-gray-700 font-medium">Upload Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-2"
                    required
                />

                {isLoading ? (
                    <>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Uploading..."
                                className="w-full max-h-40 object-contain mb-4 rounded border filter blur-lg"
                            />
                        )}
                        <div className="relative w-full bg-gray-300 rounded-full h-2 mb-2">
                            <div
                                className="h-2 bg-blue-400 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-center text-sm text-gray-700">{uploadProgress}%</p>
                    </>
                ) : selectedImage ? (
                    <img
                        src={selectedImage}
                        alt="Uploaded preview"
                        className="w-full max-h-40 object-contain mb-4 rounded border"
                    />
                ) : null}

                <textarea
                    name="description"
                    value={menu.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Description"
                    className="border p-3 rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-700 text-white font-semibold py-3 rounded hover:bg-blue-800 transition"
                >
                    Add Menu
                </button>
            </form>
        </div>
    );
}
