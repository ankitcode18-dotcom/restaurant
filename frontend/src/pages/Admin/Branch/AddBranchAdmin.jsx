import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../../Context/Main';
import Select from "react-select"

export default function AddBranchAdmin() {
    const { API_BASE_URL, notify, BRANCH, Admin_Url, fetchBranches, branches } = useContext(Context);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const branchLoginId = useParams()


    // ✅ Form Validation
    const handleValidation = () => {
        if (!firstName.trim()) return "First name is required.";
        if (!lastName.trim()) return "Last name is required.";
        if (!email.trim()) return "Email is required.";
        if (!password.trim()) return "Password is required.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        return "";
    };

    // ✅ Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = handleValidation();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");

        axios.post(
            `${API_BASE_URL}${Admin_Url}${BRANCH}/register`,
            {
                firstName,
                lastName,
                email,
                password,
                branchLoginId: branchLoginId.branch_login_id,
                role: "branch-admin"

            }
        ).then((res) => {
            if (res.data.status === 1) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                navigate('/admin');
            }
            notify(res.data.msg, res.data.status);
        }).catch(() => {
            notify("Client side error", 0);
        });
    };

    return (
        <div className="flex-1 overflow-hidden">

            <div className="flex px-8  py-5 justify-between items-center">
                <nav className="flex " aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link
                                to='/admin'
                                className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3 me-2.5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <Link
                                    to="/branch"
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Branch
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <Link
                                    to="/branch/add"
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Add
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Form */}
            <div className="relative  bg-white mx-10 my-5 shadow rounded-lg">
                <div className='flex items-center px-8 py-3 mb-4 justify-between border-b-2'>
                    <div className='text-xl font-[600] uppercase'>Add New Admin</div>
                </div>

                {error && <div className="text-red-500 text-center mb-2">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4  px-10 py-5 pb-10">
                    <div className='flex gap-2'>
                        <div className="w-1/2">
                            <label className="block text-sm font-bold">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full outline-none px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder='First name'
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-bold">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full outline-none px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder='Last name'
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold">Email</label>
                        <input type="email" name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 outline-none border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder='Email'
                        />
                    </div>

                    <div className='relative'>
                        <label className="block text-sm font-bold">Password</label>
                        {showPassword ? (
                            <FaEyeSlash
                                onClick={() => setShowPassword(false)}
                                className="absolute top-9 right-3 cursor-pointer text-gray-600"
                                fontSize={22}
                            />
                        ) : (
                            <FaEye
                                onClick={() => setShowPassword(true)}
                                className="absolute top-9 right-3 cursor-pointer text-gray-600"
                                fontSize={22}
                            />
                        )}
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            minLength="6"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 outline-none border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder='At least 6 characters'
                        />
                    </div>

                    <div className="mb-6 ">
                        <label className="block text-sm font-bold">Branch Id</label>
                        <input
                            value={branchId.branch_id}
                            className="w-full px-4 py-2  text-gray-600 mt-1 border rounded-lg outline-none "
                            readOnly
                        />
                    </div>

                    <div className="mb-6 ">
                        <label className="block text-sm font-bold">Role</label>
                        <input
                            value={'Branch-Admin'}
                            className="w-full px-4 py-2  text-gray-600 mt-1 border rounded-lg outline-none "
                            readOnly
                        />
                    </div>



                    <button
                        type="submit"
                        className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
