import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../Context/Main";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function BranchLogin() {
    const { API_BASE_URL, setBranchId } = useContext(Context)
    const [branchId, setBranchId1] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const Branch_Id = useParams()

    console.log(Branch_Id);


    useEffect(() => {
        if (Branch_Id?.branchId && Branch_Id.branchId !== "undefined") {
            setBranchId1(Branch_Id.branchId);
        } else {
            setBranchId1("");
        }
    }, [Branch_Id]);

    const navigator = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!branchId.trim() || !password.trim()) {
            setError("Please enter Branch ID and Password");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await axios.post(API_BASE_URL + "/branch/branchlogin", {
                branchId,
                password,
            });

            if (res.data.status === 1) {
                // branch data in localStorage
                localStorage.setItem("branch", JSON.stringify(res.data.branchUser));
                setBranchId(res.data.branchUser._id)
                alert("Login successful!");
                // Redirect to branch dashboard
                navigator('/branch')
            } else {
                setError(res.data.msg || "Invalid credentials");
            }
        } catch (err) {
            console.log(err);

            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    Branch Login
                </h2>

                {error && (
                    <div className="mb-4 text-red-600 text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Branch ID
                        </label>
                        <input
                            type="text"
                            value={branchId || ""}
                            onChange={(e) => setBranchId1(e.target.value)}
                            placeholder="Enter Branch ID"
                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition disabled:bg-gray-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
