const express = require('express');
const router = express.Router();
const { userLogin } = require('../controllers/userController');


router.post('/login', userLogin);
router.all("/*", function (req, res) {
    return res.status(400).send({
        status: false, message: "Make Sure Your Endpoint is Correct !!!"
    })
})

module.exports = router;