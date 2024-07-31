const express = require("express");
const {
 addCart,removeCart,getCart
} = require("../controllers/cartController");
const router = express.Router();

const { isAuthenticatedUser} = require("../middleware/auth");



router.route("/cart")
.post(isAuthenticatedUser,addCart)
.delete(isAuthenticatedUser,removeCart)
.get(isAuthenticatedUser,getCart)




module.exports = router;
