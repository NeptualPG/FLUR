const User = require('../models/user');

// GET all users 
const getAllUsers = async () => {
    return await User.find();
}

// GET user by id
const getUserById = async (id) => {
    return await User.findById(id);
}

// CREATE new user 
const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
}

// Update user
const updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, {
        new: true
    })
}

// DELETE user 
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}


// DJANGO, FASTAPI, API FASK 