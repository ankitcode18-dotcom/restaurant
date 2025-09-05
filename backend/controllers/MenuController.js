const { genertateFileName } = require("../helper");
const MenuModel = require("../models/MenuModel");

const createmenu = async (req, res) => {
    try {
        const { name, slug, description, branchId } = req.body
        const image = req.files.image

        const exist = await MenuModel.findOne({ name });
        if (exist) {
            return res.status(400).json({
                message: "Menu Exist",
                status: 0
            })
        } else {
            const fileName = await genertateFileName(image.name);
            const destination = './public/images/menu/' + fileName;
            image.mv(
                destination,
                async (err) => {
                    if (err) {
                        return res.status(500).json({
                            msg: "Unable to upload image",
                            status: 0
                        })
                    } else {
                        const menu = new MenuModel({
                            name,
                            slug,
                            branchId: branchId,
                            image: fileName,
                            description,
                        })
                        menu.save();
                        return res.status(200).json({
                            msg: "Menu created",
                            menu,
                            status: 1
                        })
                    }
                }
            )
        }

    } catch (error) {
        console.log(error.message);

    }
}

const menuRead = async (req, res) => {
    try {
        const id = req.params.id;
        let menu;

        if (id && id !== "null") {
            // branchId match OR branchId null
            menu = await MenuModel.find({
                $or: [
                    { branchId: id },
                    { branchId: null }
                ]
            }).sort({ createdAt: -1 }).populate('branchId');
        } else {
            // sabhi menus (branchId wale + null wale)
            menu = await MenuModel.find().sort({ createdAt: -1 }).populate('branchId');
        }

        return res.status(200).json({
            msg: "Menu found",
            menu,
            menu_img: "/images/menu",
            status: 1
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 0, msg: "Server error" });
    }
};


module.exports = { createmenu, menuRead }