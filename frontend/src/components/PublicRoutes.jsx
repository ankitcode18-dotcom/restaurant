import { Navigate, useParams } from "react-router-dom";

export const AdminPublic = ({ children }) => {
    const adminToken = localStorage.getItem("adminToken");
    const admin = JSON.parse(localStorage.getItem("admin")) || null;
    if (admin || admin?._id && adminToken) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
}

export const PublicBranch = ({ children }) => {
    const branch = JSON.parse(localStorage.getItem("branch")) || null;

    if (branch && branch?._id) {
        return <Navigate to={'/branch'} replace />; // ✅ Pass actual branchId
    }

    return <>{children}</>;
};

export const PublicRestro = ({ children }) => {
    const restro = JSON.parse(localStorage.getItem('restro'))
    if (restro && restro?._id) {
        return <Navigate to={'/restro'} replace />
    }
    return <>{children}</>;
}

export const RestaurantPublic = ({ children }) => {
    const profile = JSON.parse(localStorage.getItem("profile")) || null;
    const RestroTableId = JSON.parse(localStorage.getItem("RestroTableId")) || null;
    const RestroBranchId = JSON.parse(localStorage.getItem("RestroBranchId")) || null;
    if (profile && profile?._id) {
        return <Navigate to={`/restaurant?table=${RestroTableId}&branch=${RestroBranchId}`} replace />;
    }
    return <>{children}</>;
}