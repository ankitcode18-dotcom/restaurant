import React, { useContext } from "react";
import { FaBars, FaMoon, FaBell, FaSearch } from "react-icons/fa";
import { FaGripfire } from "react-icons/fa";
import { Context } from "../../Context/Main";

const RestroHeader = () => {
    const { restroData } = useContext(Context)
    
    return (
        <header className="bg-blue-500 z-20 text-white grid grid-cols-10 gap-3 px-4 py-4 items-center justify-between shadow sticky top-0 left-0">
            {/* Left Side - Logo + App Name */}
            <div className="flex items-center justify-between col-span-2 ">

                <span className="text-lg font-bold flex justify-center items-center gap-3"> <FaGripfire size={25} /> Delights</span>
                <button className="ml-2 text-xl">
                    <FaBars />
                </button>
            </div>

            {/* Middle - Search */}
            <div className="hidden md:flex items-center col-span-6 rounded-full px-3 py-1">
                <FaSearch className="mr-2 text-gray-200" />
                <input
                    type="text"
                    placeholder="Start typing..."
                    className="bg-transparent outline-none text-white placeholder-gray-200 w-64"
                />
            </div>

            {/* Right Side - Icons + Profile */}
            <div className="flex items-center justify-between col-span-2 gap-3">
                <FaMoon className="text-xl cursor-pointer" />
                <div className="relative">
                    <FaBell className="text-xl cursor-pointer" />
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        18
                    </span>
                </div>
                <span className=" font-medium flex items-center justify-center gap-2 ">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Profile"
                        className="w-8 h-8 rounded-full border-2 border-green-400"
                    />
                    {restroData?.name}</span>
            </div>
        </header>
    );
};

export default RestroHeader;
