const RestroModel = require("../../models/RestroModel")

const Login = async (req, res) => {
    const { restroId, password } = req.body
    try {
        if (!restroId || !password) {
            return res.status(400).json({ status: 0, msg: "Please enter all fields" })
        }
        const restro = await RestroModel.findOne({ restroId })
        if (!restro) {
            return res.status(401).json({ status: 0, msg: "Invalied email or password" })
        }
        if (restro.password !== password) {
            return res.status(400).json({ msg: "Invalid Credentials", status: 0 })
        }
        res.status(200).json({
            msg: "Login successfull",
            restro,
            // token: 'static-token',
            status: 1
        });
    } catch (error) {
        console.log(error.message);

    }
}
module.exports = { Login }