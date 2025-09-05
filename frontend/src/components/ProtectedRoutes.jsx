import { Navigate } from "react-router-dom";

export const AdminProtected = ({ children }) => {
    const adminToken = localStorage.getItem("adminToken");
    const admin = JSON.parse(localStorage.getItem("admin")) || null;
    if (!admin || !admin?._id || !adminToken) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}

export const ProtectBranch = ({ children }) => {
    const branch = JSON.parse(localStorage.getItem("branch"));

    if (!branch || !branch?._id) {
        return <Navigate to='/branchlogin' replace />; // ✅ send correct branchId
    }

    return <>{children}</>;
};

export const ProtectRestro = ({ children }) => {
    const restro = JSON.parse(localStorage.getItem('restro'))
    if (!restro || !restro?._id) {
        return <Navigate to='/restrologin' replace />
    }
    return <>{children}</>;
}