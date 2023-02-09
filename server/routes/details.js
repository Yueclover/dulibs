const express = require('express');
const router = express.Router();
const getOneDetails = require("../route_handlers/details")

router.get("/noauth/goodsdetails", getOneDetails)
module.exports = router