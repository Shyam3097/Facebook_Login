const userModel = require('../models/UserModel');
const jwt = require("jsonwebtoken");
const { isPresent, isValidName, isValidEmail, isValidPassword } = require('../validations/validation');

const createUser = async function (req, res) {
    try {

        const data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please Enter data to Create the User" })

        const { fname, lname, email, password } = data

        if (!isPresent(fname)) return res.status(400).send({ status: false, message: "first name is mandatory" })
        if (!isValidName(fname)) return res.status(400).send({ status: false, message: "Please Provide the valid first name" })

        if (!isPresent(lname)) return res.status(400).send({ status: false, message: "last name is mandatory" })
        if (!isValidName(lname)) return res.status(400).send({ status: false, message: "Please Provide the valid last name" })

        if (!isPresent(email)) return res.status(400).send({ status: false, message: "email is mandatory" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "email should be in  valid format eg:- Name12@gmail.com" })

        if (await userModel.findOne({ email })) return res.status(400).send({ status: false, message: "This email is already Registered Please give another Email" })

        if (!isPresent(password)) return res.status(400).send({ status: false, message: "Password is mandatory" })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "password must have one capital, one small, one number and one special character[#?!@$%^&*-]" })

        let createdata = await userModel.create(data)
        return res.status(201).send({ status: true, message: "Sign Up Successfull", data: createdata })
    } catch (error) {
        return res.status(500).send({ msg: error.message, status: false })
    }
}

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
            return res.status(400).send({ status: false, message: "Please enter Email in correct format like alpha58@gmail.com" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "password must have one capital, one small, one number and one special character[#?!@$%^&*-]" })
        }
        let data = await userModel.findOne(req.body)
        if (!data) {
            return res.status(404).send({ status: false, message: "Either email or password is wrong" })
        }
        const token = jwt.sign({
            id: data._id.toString(),
        }, "AlphicsTech")
        return res.status(200).send({ status: true, message: "user login successfull", data: { token: token } })
    } catch (error) {
        return res.status(500).send({ msg: error.message, status: false })
    }
}

module.exports = { createUser, userLogin }