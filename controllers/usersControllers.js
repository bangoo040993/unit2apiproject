const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json({ message: 'User created successfully' })
        console.log(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}