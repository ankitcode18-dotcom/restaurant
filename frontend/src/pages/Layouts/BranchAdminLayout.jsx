import { Outlet } from "react-router-dom";
import BranchHeader from "../../components/branch component/BranchHeader";
import BranchSideBar from "../../components/branch component/BranchSideBar";

export default function BranchAdminLayout() {
    return (
        <>
            <div className='bg-gray-100 relative'>
                <BranchHeader />
                <div className='grid grid-cols-11 '>
                    <div className='col-span-2  bg-white' >
                        <BranchSideBar />
                    </div>
                    <div className='col-span-9' >
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
