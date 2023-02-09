const express = require('express');
const router = express.Router();
const address = require("../route_handlers/address")

router.get("/auth/getmyaddress",address.getMyAddress)
router.get("/auth/getoneaddress",address.getOneAddress)
router.get("/auth/deleteoneaddress",address.deleteOneAddress)
router.post("/auth/addmyaddress",address.addMyAddress)
router.post("/auth/updatemyaddress",address.updateMyAddress)
module.exports = router