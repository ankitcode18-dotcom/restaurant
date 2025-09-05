const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const jwt = require("jsonwebtoken");

const encodePassword = (password) => {
    return cryptr.encrypt(password);
}

const decodePassword = (encode_password) => {
    return cryptr.decrypt(encode_password);
}



const genertateFileName = (file_name) => {
    return Math.floor(Math.random() * 1000000) + new Date().getTime() + file_name;
}


const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });
};

const verfiyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};


const verfiyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};


module.exports = { genertateFileName, encodePassword, decodePassword, generateAccessToken, verfiyAccessToken, generateRefreshToken, verfiyAccessToken }