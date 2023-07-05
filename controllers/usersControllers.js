require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const data = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id: data._id });
        if (!user) {
            throw new Error("bad credentials");
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: "User created successfully" });
        console.log(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const foundUsers = await User.find({});
        res.json({ message: "we in Neo", users: foundUsers });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (
            !user ||
            !(await bcrypt.compare(req.body.password, user.password))
        ) {
            res.json({ message: "INVALID CREDENTIALS" });
        } else {
            const token = await user.generateAuthToken();
            user.loggedIn = true;
            console.log(user.loggedIn);
            res.json({ user, token });
        }
    } catch (error) {
        res.statusCode(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatingUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        await updatingUser.save();
        if (!updatingUser) {
            res.json({ message: "Could not find User" });
        } else {
            res.json({ updatingUser });
        }
    } catch (error) {
        res.json.statusCode(400)({ message: error.message });
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const oneUser = await User.findOne({ _id: req.params.id });
        res.json({ message: "User retrieved successfully", user: oneUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.params.id });
        console.log(foundUser);
        await foundUser.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
