const { genertateFileName } = require("../../helper");
const CategoriesModel = require("../../models/CategoriesModel");
const ItemModel = require("../../models/ItemModel");
const RestroModel = require("../../models/RestroModel");

const createItem = async (req, res) => {
    const { name, menuId, price, description, branchId, categoriesId, foodType } = req.body;
    const image = req.files.image
    try {
        if (!name || !menuId || !price) {
            return res.status(400).json({ status: 0, msg: "Name, menuId and price are required" });
        }

        const exist = await ItemModel.findOne({ name, categoriesId });
        if (exist) {
            return res.status(400).json({ message: "Item exists", status: 0 });
        } else {
            const fileName = await genertateFileName(image.name);
            const destination = "./public/images/item/" + fileName;
            image?.mv(
                destination,
                async (err) => {
                    if (err) {
                        return res.status(500).json({
                            msg: "Unable to upload image",
                            status: 0
                        })
                    } else {
                        const item = new ItemModel({
                            name,
                            menuId,
                            price,
                            categoriesId,
                            branchId,
                            foodType,
                            description,
                            image: fileName,
                        })
                        await item.save();
                        return res.status(200).json({
                            msg: "Item created ",
                            item,
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

const readItems = async (req, res) => {
    try {
        const id = req.params.id

        const items = await ItemModel.find({ branchId: id })
        return res.status(200).json({
            msg: "Branch Found",
            items,
            item_img: "/images/item",
            status: 1
        });

    } catch (error) {
        console.log(error.message);

    }
}


const createCategories = async (req, res) => {

    const { name, menuId, branchId } = req.body;
    const image = req.files.image

    try {
        if (!name || !menuId) {
            return res.status(400).json({ status: 0, msg: "Name and menuId are required" });
        }

        const exist = await CategoriesModel.findOne({ name, menuId });
        if (exist) {
            return res.status(400).json({ message: "Categorie exists", status: 0 });
        } else {
            const fileName = await genertateFileName(image.name);
            const destination = "./public/images/categorie/" + fileName;
            image?.mv(
                destination,
                async (err) => {
                    if (err) {
                        return res.status(500).json({
                            msg: "Unable to upload image",
                            status: 0
                        })
                    } else {
                        const item = new CategoriesModel({
                            name,
                            menuId,
                            branchId,
                            image: fileName,
                        })
                        await item.save();
                        return res.status(200).json({
                            msg: "Item created ",
                            item,
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

const readCategories = async (req, res) => {
    try {
        const id = req.params.id
        const categories = await CategoriesModel.find({
            $or: [{ branchId: id }, { menuId: id }]
        });
        return res.status(200).json({
            msg: "Categories Found",
            categories,
            cat_img: "/images/categorie",
            status: 1
        });

    } catch (error) {
        console.log(error.message);

    }
}

const createRestro = async (req, res) => {
    const { name, restroId, branchId, password } = req.body;

    try {
        if (!name || !restroId || !password) {
            return res.status(400).json({ status: 0, msg: "Name, restroId and password are required" });
        }

        const exist = await RestroModel.findOne({ restroId })
        if (exist) {
            return res.status(401).json({ status: 0, msg: "Restro already exist" })
        }

        const restro = new RestroModel({
            name,
            restroId,
            branchId,
            password
        })
        await restro.save()
        return res.status(200).json({
            msg: "Restro profile created",
            restro,
            status: 1
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: "Internal server error",
            status: 0
        })
    }
}

const readRestro = async (req, res) => {
    const id = req.params._id
    try {
        const restro = await RestroModel.find({ id })
        return res.status(200).json({
            msg: "Restro Found",
            restro,
            status: 1
        });
    } catch (error) {

    }
}


module.exports = { createItem, readItems, createCategories, readCategories, createRestro, readRestro }