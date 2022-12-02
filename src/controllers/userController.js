const userModel = require('../models/UserModel');
const jwt = require("jsonwebtoken");
const { isPresent, isValidEmail, isValidPassword } = require('../validations/validation');

const userLogin = async function (req, res) {
    try {
        let { email, password } = req.body
        if (Object.entries(req.body).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter email and Password" })
        }
        if (!isPresent(email)) {
            return res.status(400).send({ status: false, message: "Please enter email" })
        }
        if (!isPresent(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Please enter Email in correct format like jay58@gmail.com" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "password must have one capital one small one number and one special character[#?!@$%^&*-]" })
        }
        let data = await userModel.findOne({ email: email })
        if (!data) {
            return res.status(404).send({ status: false, message: "User not found with this email" })
        }
        const token = jwt.sign({
            id: data._id.toString(),
            exp: (Date.now() / 1000) + 60 * 60 * 24 * 14
        }, "mykey")
        return res.status(200).send({ status: true, message: "user login successfull", data: { userid: data._id, token: token } })
    } catch (error) {
        return res.status(500).send({ msg: error.message, status: false })
    }
}

module.exports = { userLogin }