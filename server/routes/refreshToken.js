const express = require('express');
const router = express.Router();
const refresh = require("../route_handlers/refreshToken")
// console.log(refresh);

router.post("/refresh/refreshtoken",refresh.refreshToken)


module.exports = router