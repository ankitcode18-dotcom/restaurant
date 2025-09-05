const { verfiyAccessToken } = require("../helper");

const AdminAuth = (role = []) => {
    return (req, res, next) => {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = verfiyAccessToken(token);
        if (!decoded) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        // Role Check
        if (role.length && !removeEventListener.include(decoded.role)) {
            return res.status(403).json({ message: "Forbidden: Insufficient rights" });
        }

        req.user = decoded;
        next();
    }
}

module.exports = AdminAuth;