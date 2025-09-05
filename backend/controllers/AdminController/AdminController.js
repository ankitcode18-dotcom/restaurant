const UserModel = require("../../models/UserModel");


const adminLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body
        const admin = await UserModel.findOne({ email, role })
        if (!admin) return res.status(401).json({ message: "Invalid email or password" });

        if (admin.password !== password) {
            return res.status(400).json({ message: "Invalid Credentials", status: 0 });
        }
        res.status(200).json({
            msg: "Login successfull",
            admin,
            token: 'static-token',
            status: 1
        });
    } catch (error) {
        console.log(error.message);

    }
}


const adminRegister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingAdmin = await UserModel.findOne({ email, role });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists", status: 0 });
        }   
        const newAdmin = new UserModel({ name, email, password, role });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully", newAdmin, status: 1 });
            
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = { adminLogin, adminRegister }