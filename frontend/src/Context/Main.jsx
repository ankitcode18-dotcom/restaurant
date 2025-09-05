
import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Context = createContext();
export default function Main(props) {
    const branchData = JSON.parse(localStorage.getItem("branch"))
    const restroData = JSON.parse(localStorage.getItem("restro"))
    const RestroBranchId = JSON.parse(localStorage.getItem("RestroBranchId"))
    const RestroTableId = JSON.parse(localStorage.getItem("RestroTableId"))
    const profile = JSON.parse(localStorage.getItem("profile"))
    const notify = (msg, status) => toast(msg, { type: status ? "success" : "warning" });
    const [branches, setBranches] = useState([]);
    const [branchImg, setBranchImg] = useState([])
    const [showMsg, setShowMsg] = useState(false);
    const [menu, setMenu] = useState([]);
    const [menuImg, setMenuImg] = useState([]);
    const [branch_Id, setBranchId] = useState();
    const [categories, setCategories] = useState([]);
    const [catImg, setCatImg] = useState([]);
    const [items, setItems] = useState([]);
    const [itemsImg, setItemsImg] = useState([])
    const [table, setTables] = useState([]);
    const [orderhistroy, setorderhistroy] = useState([]);

    const API_BASE_URL = 'https://restaurant-backend-7qbj.onrender.com';
    const Admin_Url = "/admin"
    const Menu_url = '/menu'
    const BRANCH = '/branch'
    const Restro = '/restro'
    const BRANCHADMIN = `/branch`;

    useEffect(
        () => {
            const restroData = JSON.parse(localStorage.getItem("restro"))
            if (branchData) {
                setBranchId(branchData?._id)
            } else if (restroData) {
                setBranchId(restroData?.branchId)
            }
        }, []
    )

    const fetchOrder = async (profileId, tableId, branchId) => {
        console.log(branchId);

        let API = `${API_BASE_URL}/restaurant/order_history`;
        if (profileId && tableId) {
            API += `/${profileId}/${tableId}`
        } else {
            API += `/${branchId}`
        }

        // if (profile_Id && branch_Id) {
        //     API += `${branch_Id&profile_Id}`
        // }

        try {
            const res = await axios.get(API)

            if (res.data.status === 1) {
                setorderhistroy(res.data.order)
            } else {
                setorderhistroy([])
            }
        } catch (error) {
            setorderhistroy([])

        }

    }

    const fetchBranches = (id = null) => {
        let API = API_BASE_URL + BRANCH;
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setBranches(success.data.branch)
                        setBranchImg(success.data.branch_img);
                    }
                    else {
                        setBranches([])
                        setBranchImg([])
                    }
                }
            ).catch(
                (err) => {
                    console.log(err.message);
                    setBranches([])
                    setBranchImg([])
                }
            )
    }

    const fetchMenu = (id = null) => {
        let API = API_BASE_URL + Menu_url + '/menu-read'
        if (id) {
            API += `/${id}`
        }
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        setMenu(success.data.menu);
                        setMenuImg(success.data.menu_img)
                    } else {
                        setMenu([]);
                        setMenuImg([])
                    }
                }
            ).catch(
                (err) => {
                    setMenu([]);
                    setMenuImg([])
                }
            )
    }

    const fetchCategorie = async (id) => {
        try {
            let API = API_BASE_URL + BRANCHADMIN + "/categories"
            if (id) {
                API += `/${id}`
            }
            const res = await axios.get(API);
            setCategories(res.data.categories);
            setCatImg(res.data.cat_img)
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    };

    const fetchItems = async (id) => {
        try {
            let API = API_BASE_URL + BRANCHADMIN + "/items"
            if (id) {
                API += `/${id}`
            }
            const res = await axios.get(API);
            setItems(res.data.items);
            setItemsImg(res.data.item_img)
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    };

    const fetchTables = async (id) => {
        try {
            const API = API_BASE_URL + "/table" + `/${id}`
            const res = await axios.get(API)
            setTables(res.data.table)
        } catch (error) {
            console.error("Error fetching items:", err);
        }
    }



    useEffect(
        () => {
            if (branchData) {
                fetchMenu(branchData?._id ?? null)
            }
        }, [branchData?._id]
    )


    return (
        <Context.Provider value={{ API_BASE_URL, itemsImg, categories, fetchItems, fetchCategorie, Restro, items, branch_Id, BRANCHADMIN, branchData, BRANCH, catImg, Menu_url, fetchBranches, Admin_Url, branches, fetchMenu, menu, menuImg, branchImg, notify, restroData, fetchTables, table, setBranchId, showMsg, setShowMsg, RestroTableId, RestroBranchId, profile, fetchOrder, orderhistroy,setorderhistroy }} >
            <ToastContainer />
            {props.children}
        </Context.Provider>
    )
}

export { Context }
