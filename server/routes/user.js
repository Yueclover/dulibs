const express = require('express');
const router = express.Router();
const user = require("../route_handlers/user")

router.post("/noauth/register",user.register)
router.post("/noauth/login",user.login)

module.exports = router