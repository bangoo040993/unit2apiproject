const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    saveForLater: {
        type: Boolean,
        default: false,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    orderRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Item = mongoose.model("itemModel", itemSchema);

module.exports = Item;
