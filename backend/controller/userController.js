const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const validateUser = require('../validators/validateUser');
const logger = require('../middlewares/logger');
const errorMiddleware= require('../middlewares/errorMiddleware');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const userDTO = require('../dtos/userDTO');
const userService = require('../services/userService');
const authService = require('../services/authService');

//Here we are going to put that we had at routes
 
//GET all users
const getUsers = async(req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users.map(userDTO));
    } catch (err) {
        return errorHandler(res, err);
    }
}

//GET user by id 
const getUserById = async(req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user){
            return errorHandler(res, null, 400, "User not found");
        }

        res.json(userDTO(user));
    } catch (err) {
        return errorHandler(res, err);
    }
}

// CREATE user 
const createUser = async (req, res) => {
    const error = validateUser(req.body);
    if (error) return res.status(400).json({error});

    try{
        const newUser = await userService.createUser(req.body);

        res.status(201).json({
            message: "User created",
            data: newUser
        });
    } catch (err) {
        return errorHandler(res, err);
    }
}

//UPDATE user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(
            req.params.id,
            req.body,
            {new : true}
        )

        if (!updatedUser){
            return errorHandler(res, null, 404, "User not found");
        }

        res.json(updatedUser);
    } catch(err) {
        return errorHandler(res, err);
    }
} 

//DELETE user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);

        if(!deletedUser) {
            return errorHandler(res, null, 404, "User not found");
        }

        res.json({ message: "User deleted" });
    } catch(err) {
        return errorHandler(res, err);
    }
}

const login = async(req, res) =>{
    const { email, password } = req.body;

    try {
        const token = await authService.loginUser(email, password);
        res.json({token});
    } catch(err) {
        return res.status(400).json({error: err.message});
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
}