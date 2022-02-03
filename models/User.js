const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "The email is already exist"],
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        set: function (v) {
            return validator.normalizeEmail(v)
        }
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    refereshTokens: [String]

}, {
    timestamps: true
});

//encrypt password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


//access token generation

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    })
}


//Referesh token generation

UserSchema.methods.generateRefereshToken = function () {
    const refereshToken = jwt.sign({ id: this._id }, process.env.REFERESH_TOKEN_KEY, {
        expiresIn: process.env.REFERESH_TOKEN_EXPIRE
    })
    this.refereshTokens.concat([refereshToken])
}


//Matching password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User', UserSchema);
