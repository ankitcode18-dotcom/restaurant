const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const ProfileModel = require("../models/ProfileModel.js");
const CartModel = require("../models/CartModel.js");
const OrderModel = require("../models/OrderModel.js");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createUser = async (req, res) => {
    try {
        const { credential } = req.body;  // frontend se aa rha hai

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, name, email, picture, aud: clientId } = payload;

        // Check if user already exists
        let user = await ProfileModel.findOne({ email: email });
        if (!user) {
            user = await ProfileModel.create({
                googleId,
                clientId,
                name,
                email,
                picture,
            });
        } else {
            if (!user.googleId) user.googleId = googleId;
            if (!user.clientId) user.clientId = clientId;
            await user.save();
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "60s" }
        );

        res.json({ user, token, status: 1 });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Google login failed" });
    }
};

const moveToCart = async (req, res) => {
    try {
        const { cartData, userId } = req.body;
        const promises = cartData.map(
            async (cd) => {
                const exist = await CartModel.findOne({ user_id: userId, product_id: cd.item_id });

                if (exist) {
                    await CartModel.updateOne(
                        { _id: exist._id },
                        { quantity: exist.quantity + cd.qty }
                    )
                } else {
                    const cart = new CartModel({
                        user_id: userId,
                        product_id: cd.item_id,
                        quantity: cd.qty
                    });
                    await cart.save();
                }
            }
        );

        await Promise.all(promises);
        const userCart = await CartModel.find({ user_id: userId }).populate('product_id');

        let total = 0;
        userCart.forEach(item => {
            total += item.product_id.price * item.quantity;
        });


        res.status(200).json({ msg: "move to db", userCart, total, status: 1 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to move items to cart", status: 0 });

    }
}

const placeOrder = async (req, res) => {
    const { order_total, payment_type, user_id, branch_id, table_id, status } = req.body
    try {

        const cart = await CartModel.find({ user_id: user_id }).populate("product_id");

        const order = new OrderModel({
            userId: user_id,
            items: cart,
            payment_mode: payment_type,
            totalAmount: order_total,
            branchId: branch_id,
            tableId: table_id,
            status
        })
        await order.save();
        await CartModel.deleteMany({ user_id: user_id });


        // ✅ real-time socket emit
        const io = req.app.get("io"); // <-- yahi use hoga
        const populatedOrder = await OrderModel.findById(order._id).populate("items.product_id");

        io.to(`branch-${branch_id}`).emit("newOrder", populatedOrder);



        if (payment_type == 'cash') {
            //EMAIL and SMS
            res.status(200).json({
                mag: 'Order placed successfully',
                order_id: order._id,
                status: 1
            })
        } else {
            console.log(err);

            // TODO: Razorpay wala logic
            res.status(200).json({
                msg: 'Order placed successfully (payment pending)',
                order_id: order._id,
                status: 0
            })
        }

    } catch (error) {
        console.log(error.message);

    }
}

const updateOrder = async (req, res) => {
    try {
        const { user_id, item_id } = req.body;
        const cart = await CartModel.findOne({
            user_id: user_id,
            product_id: item_id
        });
        if (cart) {
            await CartModel.updateOne(
                {
                    user_id: user_id, product_id: item_id
                },
                {
                    quantity: cart.quantity + 1
                }
            )
            res.status(201).json({ msg: 'Cart Updated', status: 1 })
        } else {
            const addCart = await CartModel({
                user_id: user_id,
                product_id: item_id
            })
            await addCart.save();
            res.status(200).json({
                msg: 'Cart updated successfully',
                status: 1
            })
        }

    } catch (error) {
        console.log(error.message);
    }
}

const orderHistroy = async (req, res) => {
    try {
        const { profileId, tableId, branchId } = req.params;
        let order
        if (profileId && tableId) {
            order = await OrderModel.find({ userId: profileId, tableId: tableId })
        } else {
            order = await OrderModel.find({ branchId: branchId })
        } res.status(200).json({ msg: 'Order found', order, status: 1 })
    } catch (error) {
        console.log(error.message);

    }

}

const update_Order = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await OrderModel.findByIdAndUpdate(id, { status: status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // ✅ real-time socket emit
        const io = req.app.get("io");
        io.to(`branch-${order.branchId}`).emit("orderUpdated", order);

        res.status(200).json({ message: 'Order status updated', order, status: 1 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { createUser, moveToCart, placeOrder, updateOrder, orderHistroy, update_Order }
