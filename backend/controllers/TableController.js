const QRCode = require('qrcode');
const TableModel = require('../models/TableModel');

const createTable = async (req, res) => {
    console.log(req.body);
    const { name, size, status, branchId } = req.body
    try {
        const table = new TableModel({ name, size, status, branchId });
        await table.save();

        const url = `http://localhost:5173/restaurant?table=${table._id}&branch=${branchId}`;

        const qrCode = await QRCode.toDataURL(url);

        table.qrCode = qrCode;
        await table.save();

        return res.status(200).json({
            msg: "Table created",
            table,
            qrUrl: url,
            status: 1
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

const readTable = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ Msg: "ID not found", status: 0 })
        }
        const table = await TableModel.find({ branchId: id }).sort({ createdAt: -1 }).select("name qrCode size status");
        return res.status(200).json({
            msg: "table found",
            table,
            status: 1
        })
    } catch (error) {

    }
}

module.exports = { createTable, readTable }