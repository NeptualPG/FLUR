const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
} = require('../controller/userController');

router.post('/login', login);
router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.post('/', createUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);



module.exports = router;



// ===== OLD version ===========

/* 
// utils
const errorHandler = require('../utils/errorHandler.js');
const validateUser = require('../validators/validateUser.js');

// I learned that try/catch is necessary to handle errors in async code
// and avoid crashing the server (instead we return a 500 status)
// errorHandler helps to avoid repeating the same response logic


// GET users
router.get('/users', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err){
        // before I was writing the response manually every time
        // now I centralize that logic
        return errorHandler(res, err);
    }
})


// GET user by id
router.get('/users/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);

        // if the user doesn't exist we return 404
        if (!user){
            return errorHandler(res, null, 404, "User not found");
        }

        res.json(user);
    } catch (err){
        // this can fail if the id is invalid or DB fails
        return errorHandler(res, err);
    }
})


// POST user
router.post('/users', async(req, res) => {

    // validating before touching DB (better performance and cleaner errors)
    const error = validateUser(req.body);
    if (error){
        return res.status(400).json({error});
    }

    try {
        const newUser = new User (req.body); 
        await newUser.save();
        
        // response after saving user
        res.status(201).json({
            message: "User created",
            data: newUser 
        })

    } catch(err) {
        return errorHandler(res, err);
    }
})


// PUT user
router.put('/users/:id', async (req,res)=> {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true } // return updated version instead of old
        );

        // if no user found with that id
        if(!updatedUser){
            return errorHandler(res, null, 404,"User not found")
        }

        res.json(updatedUser);
    }catch (err){
        return errorHandler(res, err);
    }
})


// DELETE user
router.delete('/users/:id', async(req,res) => {
    try{
        // delete user by id
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        // if the user doesn't exist
        if (!deletedUser){
            return errorHandler(res, null, 404,"User not found")
        }

        res.json({ message : "User deleted"});
    }catch(err){
        return errorHandler(res, err);
    }
})


*/