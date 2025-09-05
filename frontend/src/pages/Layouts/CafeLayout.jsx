import React from 'react';
import { Outlet } from 'react-router-dom';
import CafeHeader from '../../components/cafe component/CafeHeader';
import CafeFooter from '../../components/cafe component/CafeFooter';
export default function CafeLayout() {
    return (
        <>
            < CafeHeader />
            <Outlet />
            <CafeFooter />
        </>
    )
}
