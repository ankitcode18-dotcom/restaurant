import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Main";
import ItemsBox from "../components/restro component/ItemsBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { changeQty, emptyCart, removeFormCart } from "../reducers/Cart";
import { FaRegUserCircle } from "react-icons/fa";
import { AlertTriangle } from "lucide-react";


export default function Restaurant() {
  const { showMsg, menu, menuImg, profile, fetchMenu, itemsImg, categories, fetchCategorie, items, catImg, API_BASE_URL, fetchItems, } = useContext(Context);
  const [toggle, setToggle] = useState(false)
  const { data: cartData, total: cartTotal } = useSelector(store => store.cart)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const tableId = queryParams.get("table");
  const branchId = queryParams.get("branch");
  const [offer, setOffer] = useState("🔥 Get 20% OFF on all Burgers!");
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("All");   // 👈 default All
  const [activeCategory, setActiveCategory] = useState("All");
  const dispatcher = useDispatch()
  const navigate = useNavigate()


  const handleLogin = () => {

  }


  useEffect(() => {
    if (branchId && tableId) {
      fetchMenu(branchId);
      fetchItems(branchId);
      fetchCategorie(branchId);
      localStorage.setItem('RestroBranchId', JSON.stringify(branchId))
      localStorage.setItem('RestroTableId', JSON.stringify(tableId))
    }
  }, []);


  const checkOut = () => {
    if (cartData.length > 0) {
      if (!profile) {
        navigate("/restaurant-login", { replace: true });
      } else {
        navigate(`/restaurant/order?table=${tableId}&branch=${branchId}`)
        document.body.style.overflow = " hidden"
      }
    }
  }


  // ✅ Items filter
  const filteredItems = items.filter(
    (item) =>
      (activeMenu === "All" || item.menuId === activeMenu) &&   // menu filter
      (activeCategory === "All" || item.categoriesId === activeCategory) && // category filter
      item.name.toLowerCase().includes(search.toLowerCase())
  );


  const changeQuantity = async (id, new_qty, price) => {
    // if (profile != null) {
    //     try {
    //         await axios.post(API_BASE_URL + '/user/changeQty',
    //             {
    //                 userId: profile._id,
    //                 item_id,
    //                 new_qty
    //             }
    //         )
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    dispatcher(changeQty(
      {
        item_id: id,
        new_qty: new_qty,
        price: price
      }
    ))
  }


  const removeItem = async (id, price) => {
    // if (profile != null) {
    //     try {
    //         await axios.post(API_BASE_URL + '/user/deleteCart',
    //             {
    //                 userId: profile._id,
    //                 item_id: item_id
    //             }
    //         )
    //     } catch (error) {
    //         console.log(error.message);

    //     }
    // }

    dispatcher(
      removeFormCart(
        {
          item_id: id,
          price: price
        }
      )
    )

  };


  return (
    <div className="mx-10 flex flex-col gap-5">
      {
        branchId && tableId ?
          (<>
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md transition-all duration-300">
              <div className="max-w-7xl mx-auto px-4 py-3">
                {/* Offer Banner */}
                {offer && (
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600  text-white text-sm md:text-base text-center py-2 rounded-xl shadow-lg mb-3 font-semibold animate-pulse">
                    {offer}
                  </div>
                )}

                {/* Main Header Row */}
                <div className="flex items-center justify-between gap-4">
                  {/* Logo */}
                  <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-600 tracking-wide cursor-pointer hover:scale-105 transition">
                    🍽️ Delight <span className="text-purple-600">Café</span>
                  </h1>

                  {/* Search + Lang */}
                  <div className="flex items-center gap-3 flex-1 justify-center">
                    <select className="hidden md:block border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 font-medium shadow-sm">
                      <option>English</option>
                      <option>Hindi</option>
                    </select>

                    <div className="relative w-full md:w-2/3">
                      <input
                        type="text"
                        placeholder="🔍 Search menu..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-4">
                    {/* Orders */}
                    <button onClick={() => navigate(`/restaurant/orderHistory?table=${tableId}&branch=${branchId}`)} className="hidden md:block bg-indigo-50 hover:bg-indigo-100  text-indigo-700 px-5 py-2 rounded-xl font-medium shadow-sm transition">
                      📦 Orders
                    </button>

                    {/* Cart */}
                    <div
                      onClick={() => {
                        setToggle(true);
                        document.body.style.overflow = "hidden";
                      }}
                      className="relative flex items-center justify-center  bg-gradient-to-r from-indigo-500 to-purple-600   cursor-pointer px-5 py-2 rounded-full text-white font-semibold                      shadow-lg hover:scale-110 active:scale-95 transition"
                    >
                      <MdOutlineShoppingCart size={22} />
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white                            text-xs font-bold w-5 h-5 flex items-center justify-center                            rounded-full shadow-md animate-bounce">
                        {cartData.length}
                      </span>
                    </div>

                    {/* Profile / Login */}
                    {profile ? (
                      <div className="relative group">
                        <img
                          src={profile.picture}
                          alt="user"
                          className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer shadow-md hover:scale-110 transition"
                        />
                        <div
                          className="absolute right-0 mt-3 w-44 bg-white/90 backdrop-blur-md border rounded-xl shadow-lg 
             opacity-0 invisible translate-y-2 
             group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
             transition-all duration-300 ease-out"
                        >
                          <p className="px-4 py-2 text-gray-800 font-medium border-b">{profile.name}</p>
                          <button
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-xl transition"
                          >
                            Logout
                          </button>
                        </div>

                      </div>
                    ) : (
                      <button
                        onClick={handleLogin}
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600     hover:opacity-90 text-white px-5 py-2 rounded-xl shadow-md transition font-medium"
                      >
                        <FaRegUserCircle size={18} /> Login
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </header>


            {showMsg && (
              <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-green-100 border border-green-300 text-green-800 px-5 py-3 rounded-md shadow-lg animate-slide-down transition-all">
                <span className="text-xl">✅</span>
                <span className="text-sm font-semibold">Item added to cart!</span>
              </div>
            )}

            {/* Overlay */}
            <div
              onClick={() => {
                setToggle(false);
                document.body.style = "";
              }}
              className={`w-full h-full bg-[#1514148f] fixed inset-0 z-10 transition-opacity duration-300
    ${toggle ? "opacity-100 visible" : "opacity-0 invisible"}`}
            ></div>

            {/* Cart popup  */}
            <div
              className={`w-full max-w-2xl fixed top-[15%] left-1/2 -translate-x-1/2 pb-4 bg-white shadow-lg z-20 rounded-xl 
    transition-all duration-300 transform
    ${toggle ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-4 pointer-events-none"}`}
            >
              <h2 className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                <span>Your Order</span>
                <IoCloseSharp
                  onClick={() => {
                    setToggle(false);
                    document.body.style.overflow = "";
                  }}
                  className="cursor-pointer"
                  size={25}
                />
              </h2>

              {cartData.length !== 0 ? (
                <div className="divide-y max-h-80 overflow-auto px-6">
                  {items.length !== 0 &&
                    cartData?.map((cd, index) => {
                      const item = items.find((p) => cd.item_id == p?._id);
                      return (
                        <div key={index} className="flex items-center justify-between py-4">
                          <div className="flex items-center gap-4">
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
                              <h3 className="font-semibold text-gray-800">{item?.name}</h3>
                              <p className="text-sm text-gray-500">₹{item?.price} each</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 border rounded-full px-3 py-1 bg-gray-100">
                              <button
                                onClick={() => {
                                  changeQuantity(item?._id, cd?.qty - 1, item?.price);
                                  if (cd?.qty == 1) {
                                    removeItem(item?._id, item?.price);
                                  }
                                }}
                                className="text-xl font-bold text-gray-600"
                              >
                                −
                              </button>
                              <span>{cd?.qty}</span>
                              <button
                                onClick={() =>
                                  changeQuantity(item?._id, cd?.qty + 1, item?.price)
                                }
                                className="text-xl font-bold text-gray-600"
                              >
                                +
                              </button>
                            </div>

                            <div className="text-right w-20 font-bold text-gray-700">
                              ₹{(item?.price * cd?.qty)?.toFixed(2)}
                            </div>

                            <button
                              onClick={() => removeItem(item?._id, item?.price)}
                              className="text-red-500"
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-7 text-gray-500">
                  <AiOutlineShoppingCart size={64} className="mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                  <p className="text-sm">
                    Add some delicious items from our menu to get started!
                  </p>
                </div>
              )}

              {/* Total Section */}
              <div className="border-t pt-4 mt-4 px-4 flex items-center justify-between">
                <div className="text-xl font-semibold">Total:</div>
                <div className="text-xl font-bold text-[#8B2C00]">
                  ₹{cartTotal?.toFixed(2)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 px-4 flex justify-between gap-4">
                <button
                  onClick={() => dispatcher(emptyCart())}
                  className="flex-1 border border-[#1963d9] font-bold text-lg text-[#0575ed] py-2 rounded-full hover:bg-[#fdf2e4] transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={checkOut}
                  className="flex-1 font-bold text-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-full hover:opacity-90 transition"
                >
                  Checkout
                </button>
              </div>
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
                  className={`relative min-w-[100px] h-[100px] rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 ${activeMenu === "All"
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
                    className={`relative min-w-[100px] h-[100px] rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 ${activeMenu === m?._id
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
                className={`relative min-w-[95px] h-[95px] rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ${activeCategory === "All"
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
                    className={`relative min-w-[95px] h-[95px] rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ${activeCategory === cat?._id
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
          </>
          )
          :
          (
            <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
              <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="bg-red-100 p-4 rounded-full">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Invalid Access
                </h2>

                {/* Subtitle */}
                <p className="text-gray-600 mb-6">
                  Please access the restaurant menu through a valid <span className="font-semibold">QR code</span>.
                </p>

                {/* Button */}
                <button
                  onClick={() => navigator(-1)}
                  className="px-6 py-2 bg-blue-500 text-white font-medium rounded-xl shadow hover:bg-blue-600 transition"
                >
                  Go Back
                </button>
              </div>
            </div>
          )
      }
    </div>
  );
}
