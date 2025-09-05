import React, { useContext, useEffect, useState } from "react";
import ItemsBox from "../../../components/restro component/ItemsBox";
import { Context } from "../../../Context/Main";

export default function POSView() {
    const {
        menu,
        menuImg,
        fetchMenu,
        categories,
        fetchCategorie,
        branch_Id,
        items,
        catImg,
        API_BASE_URL,
        fetchItems,
    } = useContext(Context);

    const [offer, setOffer] = useState("🔥 Get 20% OFF on all Burgers!");
    const [search, setSearch] = useState("");
    const [activeMenu, setActiveMenu] = useState("All");   // 👈 default All
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        if (branch_Id) {
            fetchMenu(branch_Id);
            fetchItems(branch_Id);
            fetchCategorie(branch_Id);
        }
    }, [branch_Id]);

    // ✅ Items filter
    const filteredItems = items.filter(
        (item) =>
            (activeMenu === "All" || item.menuId === activeMenu) &&   // menu filter
            (activeCategory === "All" || item.categoriesId === activeCategory) && // category filter
            item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header Offer */}
            {offer && (
                <div className="bg-indigo-600 text-white text-center py-2 rounded-lg shadow">
                    {offer}
                </div>
            )}

            {/* Search */}
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full md:w-1/2"
                />
                <select className="ml-4 border px-2 py-2 rounded">
                    <option>English</option>
                    <option>Hindi</option>
                </select>
            </div>

          {/* Menus */}
{menu?.length > 0 && (
    <div className="flex gap-10 overflow-x-auto no-scrollbar py-3 px-3">
        {/* All Menu */}
        <div
            onClick={() => {
                setActiveMenu("All");
                setActiveCategory("All");
            }}
            className={`relative min-w-[100px] h-[100px] rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 ${
                activeMenu === "All"
                    ? "scale-110 ring-2 ring-blue-500 shadow-lg"
                    : "hover:scale-105"
            }`}
        >
            <img
                src='/images/images.jpeg'
                alt="All"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                <span className="text-white font-medium text-xs tracking-wide">
                    All
                </span>
            </div>
        </div>

        {/* Dynamic Menus */}
        {menu.map((m) => (
            <div
                key={m?._id}
                onClick={() => {
                    setActiveMenu(m?._id);
                    setActiveCategory("All"); // reset category
                }}
                className={`relative min-w-[100px] h-[100px] rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 ${
                    activeMenu === m?._id
                        ? "scale-110 ring-2 ring-blue-500 shadow-lg"
                        : "hover:scale-105"
                }`}
            >
                <img
                    src={API_BASE_URL + menuImg + "/" + m?.image}
                    alt={m?.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                    <span className="text-white font-medium text-xs tracking-wide">
                        {m?.name}
                    </span>
                </div>
            </div>
        ))}
    </div>
)}


            {/* Categories */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-3 px-3">
                {/* All Button */}
                <div
                    onClick={() => setActiveCategory("All")}
                    className={`relative min-w-[95px] h-[95px] rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ${
                        activeCategory === "All"
                            ? "scale-110 ring-2 ring-blue-500 shadow-xl"
                            : "hover:scale-105"
                    }`}
                >
                    <img
                        src='/images/images1.jpeg'
                        alt="All"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
                        <span className="text-white font-semibold text-sm tracking-wide">
                            All
                        </span>
                    </div>
                </div>

                {/* Dynamic Categories */}
                {categories
                    .filter((cat) => activeMenu === "All" || cat.menuId === activeMenu)
                    .map((cat) => (
                        <div
                            key={cat?._id}
                            onClick={() => setActiveCategory(cat?._id)}
                            className={`relative min-w-[95px] h-[95px] rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ${
                                activeCategory === cat?._id
                                    ? "scale-110 ring-2 ring-blue-500 shadow-xl"
                                    : "hover:scale-105"
                            }`}
                        >
                            <img
                                src={`${API_BASE_URL + catImg + "/" + cat.image}`}
                                alt={cat?.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
                                <span className="text-white font-semibold text-sm tracking-wide">
                                    {cat?.name}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Items */}
            <ItemsBox
                filteredItems={filteredItems}
                activeCategory={activeCategory}
                categories={categories}
            />
        </div>
    );
}
