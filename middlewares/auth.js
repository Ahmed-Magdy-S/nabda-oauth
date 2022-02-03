//NOT WORKING YET && NEED REVISION

const jwt = require("jsonwebtoken")
const asyncHandler = require("./asyncHandler")
const ErrorResponse = require("../utils/ErrorResponse")
const User = require("../models/User")

//protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) return next(new ErrorResponse(401, "Not Authorized to access this route"))

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decoded.id)
        if (!user) return next(new ErrorResponse(401, "Not Authorized to access this route"))
        req.user = user
        next()
    } catch (error) {
        return next(new ErrorResponse(401, "Not Authorized to access this route"))
    }
})


module.exports = {
    protect 
}