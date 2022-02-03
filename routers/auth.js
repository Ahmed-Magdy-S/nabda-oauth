const router = require("express").Router()
const { userRegister, userLogin } = require("../controllers/auth")

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)





module.exports = router