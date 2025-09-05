import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ navigate add
import { Context } from "../Context/Main";
import axios from "axios";
import { emptyCart } from "../reducers/Cart";

function RestaurantOrder() {
    const { items, fetchMenu, fetchItems, fetchCategorie, itemsImg, API_BASE_URL, profile } = useContext(Context);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const tableId = queryParams.get("table");
    const branch = queryParams.get("branch");
    const dispatcher = useDispatch();

    const [payment_type, setPaymentType] = useState('cash');
    const [showPopup, setShowPopup] = useState(false); // ✅ popup ke liye state

    const navigate = useNavigate();

    useEffect(() => {
        if (branch && tableId) {
            fetchMenu(branch);
            fetchItems(branch);
            fetchCategorie(branch);
        }
    }, []);

    const { data: cartData, total: cartToal } = useSelector(store => store.cart);

    const handlerOrder = async () => {
        const data = {
            order_total: cartToal,
            payment_type,
            user_id: profile._id,
            branch_id: branch,
            table_id: tableId,
            status: "pending",
        };
        try {
            const res = await axios.post(API_BASE_URL + '/restaurant/order/place-order', data,
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.data) {
                setShowPopup(true); // ✅ popup dikhao
                document.body.style.overflow = ''; // Scroll disable karo
                setTimeout(() => {
                    setShowPopup(false);
                    dispatcher(emptyCart())
                    navigate(`/restaurant?table=${tableId}&branch=${branch}`);
                }, 2000); // 2s baad navigate karega
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 relative">
            {/* ✅ Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
                    <div className="bg-white/90 rounded-3xl shadow-2xl p-10 text-center transform transition-all scale-100 animate-fadeIn relative">

                        {/* Green glowing circle */}
                        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-green-100 shadow-lg shadow-green-200 mb-6 animate-pulse">
                            <svg
                                className="w-12 h-12 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-extrabold text-green-600 mb-3 tracking-wide">
                            Order Placed!
                        </h2>

                        {/* Subtitle */}
                        <p className="text-gray-700 text-lg">
                            Thank you 🎉<br />
                            Redirecting you to your table...
                        </p>

                        {/* Decorative gradient line */}
                        <div className="w-32 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 mx-auto mt-6 rounded-full"></div>
                    </div>
                </div>
            )}


            {/* Page Header */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Restaurant Order</h1>
                <p className="text-gray-600 space-y-1">
                    <span className="block">
                        <span className="font-semibold">Table Name:</span> {queryParams.get("tableName")}
                    </span>
                    <span className="block">
                        <span className="font-semibold">Table ID:</span> {queryParams.get("tableId")}
                    </span>
                    <span className="block">
                        <span className="font-semibold">Table Size:</span> {queryParams.get("size")}
                    </span>
                </p>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Order</h2>
                <ul className="space-y-3">
                    {cartData.length !== 0 ? (
                        cartData?.map((cd) => {
                            const item = items.find((p) => cd.item_id == p?._id);
                            return (
                                <li key={item?._id} className="flex items-center justify-between border-b pb-2">
                                    <div className="flex gap-10 justify-center ">
                                        <div className="w-14 h-14 bg-[#fff8e7] flex items-center justify-center rounded-lg overflow-hidden border">
                                            {item?.image ? (
                                                <img
                                                    src={API_BASE_URL + itemsImg + "/" + item?.image}
                                                    alt={item?.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xl">🍽️</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">{item?.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {cd?.qty}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold  text-gray-700">
                                        ₹{cd?.qty * item?.price}
                                    </p>
                                </li>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </ul>
                <div className="flex justify-between mt-4 text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>₹{cartToal}</span>
                </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Choose Payment Method
                </h2>
                <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                        <input onClick={() => setPaymentType('cash')} type="radio" name="payment" value="cash" defaultChecked />
                        <span>Cash </span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input onClick={() => setPaymentType('online')} type="radio" name="payment" value="upi" />
                        <span>UPI (Google Pay / PhonePe / Paytm)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input onClick={() => setPaymentType('online')} type="radio" name="payment" value="card" />
                        <span>Credit / Debit Card</span>
                    </label>
                </div>
                <button
                    onClick={handlerOrder}
                    className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition"
                >
                    Confirm & Pay
                </button>
            </div>
        </div>
    );
}


export default RestaurantOrder