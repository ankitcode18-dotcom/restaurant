import { GoogleLogin } from '@react-oauth/google';
import React, { useContext, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { Context } from '../Context/Main';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dbToCart } from '../reducers/Cart';


export default function RestaurantLogin() {
    const { RestroBranchId, RestroTableId, API_BASE_URL } = useContext(Context)
    const { data: cartData, total: cartTotal } = useSelector(store => store.cart)
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatcher = useDispatch();


    const handleSuccess = async (credentialResponse) => {
        try {
            const credential = credentialResponse?.credential; // raw JWT
            if (!credential) throw new Error("No credential received");

            const res = await axios.post("https://restaurant-backend-7qbj.onrender.com/restaurant/user",
                { credential }, // ✅ raw JWT bhejo
                { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.status == 1) {
                localStorage.setItem("profileToken", res.data.token);
                localStorage.setItem("profile", JSON.stringify(res.data.user));
                navigate(`/restaurant?table=${RestroTableId}&branch=${RestroBranchId}`);
                try {
                    const cartMove = await axios.post(API_BASE_URL + '/restaurant/user/moveToCart',
                        {
                            cartData,
                            userId: res.data.user._id
                        }
                    )
                    if (cartMove.data.status == 1) {
                        const data = cartMove.data.userCart.map(
                            (item) => {
                                return {
                                    item_id: item.product_id._id,
                                    qty: item.quantity
                                }
                            }
                        )

                        dispatcher(dbToCart({ data: data, total: cartMove.data.total }))
                    }


                } catch (error) {

                }




            }




        } catch (e) {
            console.error(e);
        }
    };



    const handleError = () => setError("Google Login failed");


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold text-center mb-2">Sign in</h1>
                <p className="text-center text-gray-600 mb-6">Continue with your Google account</p>


                {!user ? (
                    <div className="flex flex-col items-center gap-4">
                        <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
                        {error && (
                            <div className="w-full text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded-lg p-2">
                                {error}
                            </div>
                        )}
                        <div className="text-xs text-gray-500 text-center">
                            By continuing, you agree to our Terms & Privacy Policy.
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800">
                            Logged in as <b>{user.name || user.email}</b>
                        </div>
                        <ProfileCard user={user} />
                        <button
                            onClick={() => {
                                googleLogout();
                                localStorage.removeItem("token");
                                setUser(null);
                            }}
                            className="w-full py-2 rounded-xl bg-gray-900 text-white hover:opacity-90"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


function ProfileCard({ user }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl border">
            {user?.picture ? (
                <img src={user.picture} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
            ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200" />
            )}
            <div>
                <div className="font-medium">{user?.name || "User"}</div>
                <div className="text-sm text-gray-600">{user?.email || "—"}</div>
            </div>
        </div>
    );
}
