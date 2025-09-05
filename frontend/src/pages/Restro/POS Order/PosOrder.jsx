import React, { useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { useContext } from "react";
import { Context } from "../../../Context/Main";
import { useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

export default function PosOrder() {
    const { orderhistroy, restroData, fetchOrder, setorderhistroy, API_BASE_URL, items, fetchItems } = useContext(Context);


    useEffect(() => {
        // Call fetchOrder only once when restroData.branchId changes
        if (restroData?.branchId) {
            fetchOrder(null, null, restroData.branchId);
            fetchItems(restroData.branchId);
        }
    }, [restroData?.branchId]);


    useEffect(() => {
        const socket = io("https://restaurant-backend-7qbj.onrender.com", {
            transports: ["websocket"], // force websocket
        });

        socket.on("connect", () => {
            console.log("✅ Connected to server:", socket.id);
            socket.emit("joinBranch", restroData.branchId);
        });

        // ✅ Listen for new orders
        socket.on("newOrder", (order) => {
            setorderhistroy((prev) => {
                // Agar order pehle se exist hai to dobara add na kare
                const exists = prev.some((o) => o._id === order._id);
                if (exists) return prev;
                return [order, ...prev];
            });
        });

        socket.on("connect_error", (err) => {
            console.error("❌ Connection error:", err.message);
        });

        return () => socket.disconnect();
    }, [restroData?.branchId]);


    const statuses = ["preparing", "prepared", "served"];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
        ).padStart(2, "0")} | ${String(date.getDate()).padStart(2, "0")}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}-${date.getFullYear()}`;
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axios.put(`https://restaurant-backend-7qbj.onrender.com/restaurant/updated_order/${id}`, { status: newStatus });
            if (res?.data?.order) {
                setorderhistroy((prev) =>
                    prev.map((o) => (o._id === id ? res.data.order : o))
                );
            }
        } catch (error) {
            console.error("❌ Error updating status:", error.message);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">POS Orders (Manager Panel)</h2>

                {
                    orderhistroy?.length > 0 ? (
                        [...orderhistroy]   // clone array
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
                            .map((order) => (
                                <div
                                    key={order._id + 1}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden mb-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {/* Left Column */}
                                        <div className="p-6 border-r border-gray-100">
                                            <div className="mb-6">
                                                <div className="flex items-center mb-1">
                                                    <h2 className="text-gray-700 font-medium">Order ID: </h2>
                                                    <span className="text-blue-500 font-bold ml-1">
                                                        #{order._id}
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 text-sm">
                                                    {formatDate(order.createdAt)}
                                                </p>
                                            </div>

                                            <div className="space-y-3 mb-8">
                                                <div className="flex">
                                                    <span className="text-gray-600 w-28">Customer:</span>
                                                    <span className="text-gray-800 font-medium">
                                                        {order.user}
                                                    </span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-600 w-28">Table:</span>
                                                    <span className="text-gray-800 font-medium">
                                                        {order.tableId}
                                                    </span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-600 w-28">Payment:</span>
                                                    <span className="text-gray-800 font-medium uppercase">
                                                        {order.payment_mode} ({order.payStatus})
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Status Change */}
                                            <div className="mb-4">
                                                <label className="block text-gray-600 mb-1">Status:</label>

                                                {order.status === "pending" ? (
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(order._id, "accepted")
                                                            }
                                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(order._id, "rejected")
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : order.status === "accepted" ||
                                                    statuses.includes(order.status) ? (
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(order._id, e.target.value)
                                                        }
                                                        className="border rounded-md px-3 py-2 text-sm w-full"
                                                    >
                                                        <option value="accepted">accepted</option>
                                                        {statuses.map((s) => (
                                                            <option key={s} value={s}>
                                                                {s}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <p
                                                        className={`font-bold ${order.status === "rejected"
                                                            ? "text-red-500"
                                                            : "text-gray-800"
                                                            }`}
                                                    >
                                                        {order.status}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Restaurant Info */}
                                            <div className="mb-6 flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-gray-800 font-medium mb-2">
                                                        Jhotwara-1(main)
                                                    </h3>
                                                    <div className="flex items-start text-gray-600 mb-2">
                                                        <MapPin
                                                            size={16}
                                                            className="mr-2 mt-0.5 flex-shrink-0"
                                                        />
                                                        <p className="text-sm">
                                                            G-2, Gokulpura, Jhotwara, Jaipur 302012
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Phone size={14} className="text-blue-500" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="p-6">
                                            <h2 className="text-gray-800 font-medium mb-6">
                                                Order Details
                                            </h2>

                                            <div className="space-y-4 mb-6">
                                                {order.items.map((prods, idx) => {
                                                    const prod = items.find((it) => it._id === prods.product_id);
                                                    return (
                                                        <div
                                                            key={prod?._id}
                                                            className="flex items-center justify-between"
                                                        >
                                                            <div>
                                                                <h3 className="font-medium text-gray-800">
                                                                    {prod?.name}
                                                                </h3>
                                                                <p className="text-sm text-gray-600">
                                                                    Quantity: {prods?.quantity}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    price: {prod.price}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-medium text-gray-900">
                                                                    ₹ {prods?.quantity * prod?.price}
                                                                </p>
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
                                        </div>
                                    </div>
                                </div>
                            ))) : (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <p className="text-gray-500 text-lg">No orders found.</p>
                        </div>
                    )}
            </div>
        </div>
    );
}
