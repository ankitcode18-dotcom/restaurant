import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context/Main";
import { ArrowLeft, ArrowRight, Download, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function RestaurantOrderHistory() {
    const { fetchOrder, profile, RestroTableId, RestroBranchId, orderhistroy, API_BASE_URL, itemsImg, items, fetchItems, setorderhistroy } = useContext(Context);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        fetchOrder(profile?._id, RestroTableId,);
        fetchItems(RestroBranchId);
    }, []);

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("✅ Connected to server:", socket.id);
            socket.emit("joinBranch", RestroBranchId);
        });

        // 🆕 Listen for new orders
        socket.on("newOrder", (order) => {
            setorderhistroy((prev) => {
                const exists = prev.some((o) => o._id === order._id);
                if (exists) return prev;
                return [order, ...prev];
            });
        });

        // 🆕 Listen for order status updates
        socket.on("orderUpdated", (updatedOrder) => {
            setorderhistroy((prev) =>
                prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
            );
        });

        socket.on("connect_error", (err) => {
            console.error("❌ Connection error:", err.message);
        });

        return () => socket.disconnect();
    }, [RestroBranchId]);



    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")} AM, ${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`
    }

    const getOrderStatus = (status) => {
        const statuses = ["pending", "accepted", "preparing", "prepared", "served"];
        const currentIndex = statuses.indexOf(status.toLowerCase());
        return currentIndex >= 0 ? currentIndex : 0;
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 flex justify-between gap-3">
                    <button
                        onClick={() => {
                            const urlParams = new URLSearchParams(location.search)
                            const tableId = urlParams.get("table") || ""
                            const branchId = urlParams.get("branch") || ""
                            navigate(`/restaurant?table=${tableId}&branch=${branchId}`)
                        }}
                        className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        <span>Back to Menu</span>
                    </button>

                    <button
                        onClick={() => {
                            const urlParams = new URLSearchParams(location.search)
                            const tableId = urlParams.get("table") || ""
                            const branchId = urlParams.get("branch") || ""
                            navigate(`/Checkout?table=${tableId}&branch=${branchId}`)
                        }}
                        className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                    >
                        <span>Back to CheckOut</span>
                        <ArrowRight size={16} className="ml-1" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500 text-lg">Loading your order details...</p>
                    </div>
                ) :
                    orderhistroy?.length > 0 ? (
                        [...orderhistroy]   // clone array
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
                            .map((order) => {
                                return (<div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {/* Left Column */}
                                        <div className="p-6 border-r border-gray-100">
                                            <div className="mb-6">
                                                <div className="flex items-center mb-1">
                                                    <h2 className="text-gray-700 font-medium">Order ID: </h2>
                                                    <span className="text-blue-500 font-bold ml-1">#{order._id.slice(-7)}</span>
                                                </div>
                                                <p className="text-gray-500 text-sm">{formatDate(order.createdAt)}</p>
                                            </div>

                                            <div className="space-y-3 mb-8">
                                                <div className="flex">
                                                    <span className="text-gray-600 w-28">Order Type:</span>
                                                    <span className="text-gray-800 font-medium">Dining Table</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-600 w-28">Table Name:</span>
                                                    <span className="text-gray-800 font-medium">{order.tableId || "Table 2"}</span>
                                                </div>
                                            </div>

                                            <div className=" flex justify-center flex-col items-center mb-5 ">
                                                <p className="text-gray-500 text-sm mb-2">Estimated delivery time</p>
                                                <p className="text-2xl font-bold text-gray-800">15 min</p>
                                            </div>

                                            <div className="flex justify-center mb-8">
                                                <div className="bg-yellow-50 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                                                    <div className="relative">
                                                        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-8 w-8 text-green-500"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 bg-orange-100 rounded-full p-1">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 text-orange-500"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-center text-gray-700 mb-6">
                                                {/* Got your order <span className="text-blue-500 font-medium">{orderhistroy}</span> */}
                                            </p>

                                            {/* Order Progress */}
                                            <div className="mb-4">
                                                {/* Progress Bar */}
                                                <div className="relative pt-2 pb-2">
                                                    {/* Progress Line */}
                                                    <div className="absolute top-7 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
                                                    <div
                                                        className="absolute top-7 left-0 h-0.5 bg-blue-500 z-0 transition-all duration-500"
                                                        style={{
                                                            width: `${(getOrderStatus(order.status) / 4) * 100}%`,
                                                        }}
                                                    ></div>
                                                </div>

                                                {/* Status Steps */}
                                                <div className="flex justify-baseline relative z-10">
                                                    {["Placed", "Accept", "Preparing", "Prepared", "Serving"].map((label, idx) => (
                                                        <div key={idx} className="flex flex-col items-center w-1/5">
                                                            <div
                                                                className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${idx < getOrderStatus(order.status)
                                                                    ? "bg-blue-500" // Highlight completed statuses
                                                                    : idx === getOrderStatus(order.status)
                                                                        ? order.status.toLowerCase() === "delivered"
                                                                            ? "bg-blue-700"
                                                                            : "bg-green-500"
                                                                        : "bg-gray-200"
                                                                    }`}
                                                            >
                                                                {idx <= getOrderStatus(order.status) ? (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4 text-white"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                ) : null}
                                                            </div>
                                                            <span className="text-xs text-center mt-1 text-gray-600">{label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Restaurant Info */}
                                            <div className="mb-6 flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-gray-800 font-medium mb-2">Jhotwara-1(main)</h3>
                                                    <div className="flex items-start text-gray-600 mb-2">
                                                        <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm">G-2, Gokulpura, Jhotwara, Jaipur 302012</p>
                                                    </div>
                                                </div>

                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Phone size={14} className="text-blue-500" />
                                                </div>

                                            </div>

                                            {/* Payment Info */}
                                            <div className="border-t border-gray-100 pt-4">
                                                <h3 className="text-gray-800 font-medium mb-3">Payment Info</h3>
                                                <div className="space-y-2">
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-20">Method:</span>
                                                        <span className="text-gray-800 uppercase">{order.payment_mode}</span>
                                                    </div>
                                                    <div className="flex">
                                                        <span className="text-gray-600 w-20">Status:</span>
                                                        <span
                                                            className={`font-semibold ${order.payStatus === "paid"
                                                                ? "text-green-600"

                                                                : "text-red-500"
                                                                }`}
                                                        >
                                                            {order.payStatus}
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="p-6">
                                            <h2 className="text-gray-800 font-medium mb-6">Order Details</h2>

                                            <div className="space-y-4 mb-6">
                                                {order.items.map((prod, idx) => {
                                                    const item = items.find((it) => it._id === prod.product_id);
                                                    return (< div key={idx} className="flex items-center gap-4" >
                                                        <div className="relative">
                                                            <img
                                                                src={API_BASE_URL + itemsImg + "/" + item?.image}
                                                                alt={item?.name}
                                                                className="w-16 h-16 rounded-md object-cover"
                                                            />
                                                            <div className="absolute -top-2 -left-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                                {prod?.quantity}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-medium text-gray-800">{item?.name}</h3>
                                                            <p className="text-sm text-gray-600">
                                                                Quantity: {prod?.quantity}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                price: {item?.price}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium text-gray-900">₹ {Number(prod?.quantity) * Number(item?.price)}</p>
                                                        </div>
                                                    </div>
                                                    )
                                                }
                                                )}
                                            </div>

                                            <div className="border-t border-gray-100 pt-4 mb-4">
                                                <div className="flex justify-between py-2">
                                                    <span className="text-gray-600">Subtotal</span>
                                                    <span className="font-medium">₹ {order.totalAmount}</span>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-100 pt-4 mb-8">
                                                <div className="flex justify-between py-2">
                                                    <span className="text-gray-800 font-medium">Total</span>
                                                    <span className="font-bold">₹ {order.totalAmount}</span>
                                                </div>
                                            </div>

                                            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium flex items-center justify-center">
                                                <Download size={18} className="mr-2" />
                                                Download Invoice
                                            </button>
                                        </div>
                                    </div>
                                </div>)
                            })
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <p className="text-gray-500 text-lg">No orders found.</p>
                        </div>
                    )}

            </div>
        </div >
    )
}
