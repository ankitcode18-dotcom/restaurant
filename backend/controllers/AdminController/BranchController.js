const { genertateFileName, encodePassword } = require("../../helper");
const BranchModel = require("../../models/BranchModel");
const ItemModel = require("../../models/ItemModel");
const UserModel = require('../../models/UserModel')

const read = async (req, res) => {
    try {
        const id = req.params.id
        let branch;
        if (id) {
            branch = await BranchModel.findById(id);
        } else {
            branch = await BranchModel.find().sort({ createdAt: -1 });
        }

        return res.status(200).json({
            msg: "Branch Found",
            branch,
            branch_img: "/images/branch",
            status: 1
        })

    } catch (error) {
        console.log(error.message);

    }
}

const create = async (req, res) => {
    try {
        const {
            name,
            branchId,
            password,
            rating,
            isActive,
            'address.street': street,
            'address.city': city,
            'address.state': state,
            'address.pincode': pincode,
            'contact.phone': phone,
            'contact.email': email
        } = req.body;
        const image = req.files.image

        const exist = await BranchModel.findOne({ branchId });
        if (exist) {
            return res.status(400).json({ message: "Branch exists", status: 0 });
        } else {
            const fileName = await genertateFileName(image.name);
            const destination = "./public/images/branch/" + fileName;
            image?.mv(
                destination,
                async (err) => {
                    if (err) {
                        return res.status(500).json({
                            msg: "Unable to upload image",
                            status: 0
                        })
                    } else {
                        const branch = await new BranchModel({
                            name,
                            branchId,
                            password,
                            rating,
                            image: fileName,
                            isActive: isActive === 'true',
                            address: {
                                street,
                                city,
                                state,
                                pincode
                            },
                            contact: {
                                phone,
                                email
                            }
                        })
                        branch.save();
                        return res.status(200).json({
                            msg: "Branch created ",
                            branch,
                            status: 1
                        })
                    }
                }
            )

        }

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            msg: "Internal server error",
            status: 0
        })
    }
}

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, branchId, role } = req.body
        if (!firstName || !email || !password) {
            return res.status(400).json({ msg: 'All fields are required', status: 0 });
        }
        const exist = await UserModel.findOne({ email })
        if (exist) {
            return res.send(409).json({ msg: 'User already exists', status: 0 });
        }

        const branchAdmin = new UserModel({
            firstName,
            lastName,
            email,
            branchId,
            password: encodePassword(password),
            role
        })
        await branchAdmin.save()
        return res.status(201).json({ msg: "Branch admin registered succesfully", status: 1 })
    } catch (error) {
        console.log(error.message);

        res.status(500).json({ mag: "", status: 0 })
    }
}

const branchLogin = async (req, res) => {
    try {
        const { branchId, password } = req.body
        const branchUser = await BranchModel.findOne({ branchId });

        if (!branchUser) {
            return res.status(404).json({ message: "Invalid Credentials", status: 0 });
        }

        if (branchUser.password !== password) {
            return res.status(400).json({ message: "Invalid Credentials", status: 0 });
        }
        res.status(200).json({
            msg: "Login successfull",
            branchUser,
            status: 1
        });
    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ message: "Internal Server Error", status: 0 })
    }
};


module.exports = { create, read, register, branchLogin }