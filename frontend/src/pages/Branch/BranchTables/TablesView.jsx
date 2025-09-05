import React, { useContext, useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // ✅ correct
import { Context } from "../../../Context/Main";
import axios from "axios";


export default function TableView() {
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [qrData, setQrData] = useState(null);

    const handleSubmit = async () => {
        const { data } = await axios.post("http://localhost:5000/table/create-table", {
            name,
            size,
        });
        setQrData(data.qrCode); // backend se QR code data aayega
    };

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-3">Book Your Table</h2>
            <input
                className="border p-2 mr-2"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="border p-2 mr-2"
                placeholder="Table Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
                Submit
            </button>

            {qrData && (
                <div className="mt-5">
                    <h3 className="font-semibold">Your Table QR:</h3>
                    <QRCode value={qrData} size={200} />
                </div>
            )}
        </div>
    );
}