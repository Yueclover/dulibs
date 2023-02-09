const express = require('express');
const router = express.Router();
const cart = require("../route_handlers/cart")

router.post("/auth/addcart",cart.add)
router.get("/auth/getcart",cart.getCart)
router.post("/auth/delcgood",cart.deleteCart)

module.exports = router