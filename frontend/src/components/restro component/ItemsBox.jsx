import React, { useContext, useState } from "react";
import { Context } from "../../Context/Main";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/Cart";
import axios from "axios";

export default function ItemsBox({ filteredItems, activeCategory, categories }) {
    const { itemsImg, API_BASE_URL, userData, setShowMsg, profile} = useContext(Context);
    const [foodFilter, setFoodFilter] = useState("All");
    const dispatcher = useDispatch()

    const categoryName =
        activeCategory === "All"
            ? "All Items"
            : categories.find((cat) => cat._id === activeCategory)?.name || "Items";

    // Food filter apply
    const finalItems = filteredItems.filter((item) =>
        foodFilter === "All" ? true : item?.foodType === foodFilter
    );



    const cartToDb = (id, price) => {
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 2000);
        if (profile != null) {
            axios.post(API_BASE_URL + '/restaurant/update-db',
                {
                    user_id: profile._id,
                    item_id: id
                }
            )
        }
        dispatcher(addToCart({
            item_id: id,
            price: price
        }))
    }


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{categoryName}</h2>

                {/* Veg/Non-Veg Filter Buttons */}
                <div className="flex bg-gray-100 p-1 rounded-full shadow-sm">
                    {["All", "Veg", "Non-Veg"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFoodFilter(type)}
                            className={`px-4 py-1 rounded-full text-sm font-medium transition ${foodFilter === type
                                ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md"
                                : "text-gray-600 hover:text-gray-800"
                                }`}
                        >
                            {type === "All"
                                ? "All"
                                : type === "Veg"
                                    ? "Veg 🥗"
                                    : "Non-Veg 🍗"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Items Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-28">
                {finalItems?.length > 0 ? (
                    finalItems.map((item) => (
                        <div
                            key={item?._id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
                        >
                            {/* Image */}
                            <div className="relative group">
                                <img
                                    src={API_BASE_URL + itemsImg + "/" + item?.image}
                                    alt={item?.name}
                                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <span className="absolute bottom-2 right-2 bg-white/90 text-blue-600 font-bold px-3 py-1 text-sm rounded-full shadow-md">
                                    ₹{item?.price}.00
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                                    {item?.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {item?.description}
                                </p>

                                <button
                                    onClick={() =>
                                        cartToDb(
                                            item?._id,
                                            item?.price
                                        )
                                    }
                                    className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 w-full py-2 rounded-full hover:shadow-lg hover:scale-105 transition self-center">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No items found.</p>
                )}
            </div>
        </div >
    );
}
