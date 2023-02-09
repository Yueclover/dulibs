const express = require('express');
const router = express.Router();
const order = require("../route_handlers/order")

router.post("/auth/submitorder",order.submitOrder)


module.exports = router