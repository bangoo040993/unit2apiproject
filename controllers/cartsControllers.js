const Cart = require("../models/cartOfUserModel");
const User = require("../models/userModel");
const Item = require("../models/itemModel");

exports.createCart = async (req, res) => {
    try {
        req.body.user = req.user._id;
        req.body.item = req.params.id;
        const cart = await Cart.create(req.body);
        req.user.cart = { _id: cart._id };
        await req.user.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

exports.getOneCart = async (req, res) => {
    try {
        const oneCart = await Cart.findOne({ _id: req.params.id });
        res.json({
            message: "Cart retrieved successfully",
            cart: oneCart,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        const foundCarts = await Cart.find({});
        res.json({
            message: "we in Neo",
            cart: foundCarts,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addItemToCart = async (req, res) => {
    try {
        const itemId = req.body.item;
        const cartId = req.params.id;
        const item = await Item.findOne({ _id: itemId });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        const cart = await Cart.findOne({ _id: cartId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items.push(item);
        await cart.save();
        res.json({ message: "Item added to cart successfully", cart: cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const itemId = req.body.item;
        const cartId = req.params.id;
        const item = await Item.findOne({ _id: itemId });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        const cart = await Cart.findOne({ _id: cartId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items.pull(itemId);
        await cart.save();
        res.json({ message: "Item remove from cart successfully", cart: cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const foundCart = await Cart.findOne({ _id: req.params.id });
        console.log(foundCart);
        await foundCart.deleteOne();
        res.json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
