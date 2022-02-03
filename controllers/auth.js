const User = require("../models/User")
const ErrorResponse = require("../utils/ErrorResponse")
const asyncHandler = require('../middlewares/asyncHandler')

//@desc     User Registration
//@route    POST /api/v1/auth/register
//@access   Public
const userRegister = asyncHandler(async (req, res, next) => {
    const user = new User(req.body)
    const accessToken = user.generateAccessToken()
    const refereshToken = user.generateRefereshToken()
    await user.save()
    res.status(201).send({ success: true, message: "User is created", accessToken, refereshToken })
})

//@desc     User Login
//@route    POST /api/v1/auth/register
//@access   Public
const userLogin = asyncHandler(async (req, res, next) => {
    //check user email and password
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new ErrorResponse(400, "The email or password is invalid"))
    const isMatchedPassword = await user.matchPassword(req.body.password)
    if (!isMatchedPassword) return next(new ErrorResponse(400, "The email or password is invalid"))

    //generate access and referesh tokens
    const accessToken = user.generateAccessToken()
    const refereshToken = user.generateRefereshToken()

    res.status(200).send({ success: true, message: "You are logged In", accessToken, refereshToken })
})



module.exports = {
    userRegister , userLogin
}