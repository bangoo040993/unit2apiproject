const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

userSchema.pre("save", async function (next) {
    this.isModified("password")
        ? (this.password = await bcrypt.hash(this.password, 8))
        : null;
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET);
    return token;
};

const User = mongoose.model("userModel", userSchema);

module.exports = User;
