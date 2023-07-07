const Item = require("../models/itemModel");
const User = require("../models/userModel");
//POST\\
exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json({
            message: "Item created successfully",
            createdItem: item,
        });
        console.log(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//GET\\
exports.getOneItem = async (req, res) => {
    try {
        const oneItem = await Item.findOne({ _id: req.params.id });
        res.json({
            message: "Item retrieved successfully",
            item: oneItem,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//GET\\
exports.getAllItems = async (req, res) => {
    try {
        const foundItems = await Item.find({});
        res.json({ message: "we in Neo", Items: foundItems });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const foundItem = await Item.findOne({ _id: req.params.id });
        console.log(foundItem);
        await foundItem.deleteOne();
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.favoriteAnItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const itemId = req.params.id;
        const item = await Item.findOne({ _id: itemId });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isFavorite = !!user.favorites.includes(itemId);
        if (isFavorite) {
            user.favorites.pull(itemId);
        } else {
            user.favorites.push(itemId);
        }
        await user.save();
        res.json({
            message: "Item favorited/unfavorited successfully",
            user: user,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        await updatedItem.save();
        if (!updatedItem) {
            res.json({ message: "Could not find Item" });
        } else {
            res.json({ updatedItem });
        }
    } catch (error) {
        res.json.statusCode(400)({ message: error.message });
    }
};
