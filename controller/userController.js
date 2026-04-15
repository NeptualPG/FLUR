const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const validateUser = require('../validators/validateUser');
const logger = require('../middlewares/logger');
const errorMiddleware= require('../middlewares/errorMiddleware');

//Here we are going to put that we had at routes
 
//GET all users
const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        return errorHandler(res, err);
    }
}

//GET user by id 
const getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user){
            return errorHandler(req, null, 400, "User not found");
        }

        res.json(user);
    } catch (err) {
        return errorHandler(res, err);
    }
}

// CREATE user 
const createUser = async (req, res) => {
    const error = validateUser(req.body);
    if (error) return res.status(400).json({error});

    try{
        const newUser = new User(req.body);
        await newUser.save();

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
        const updatedUser = await User.findByIdAndUpdate(
            req.param.id,
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
        const deleteUser = await User.findByIdAndDelete(req.params.id);

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

    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({ error: ""})
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
        return res.status(400).json({error: "Invalid credentials"});
    }

    res.json({ message: "login succesful" });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}