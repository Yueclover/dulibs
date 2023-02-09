const express = require('express');
const router = express.Router();
const pay = require("../route_handlers/pay")
// console.log(refresh);

router.post("/auth/payment",pay.payment)


module.exports = router