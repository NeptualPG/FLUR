const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 
const errorHandler = require('../utils/errorHandler.js');

// I didn't know that the try catch to report a status 500 were necessary
// that equal is a bit repeated code

// GET User
router.get('/users', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err){

        // before
        // return res.status(500).json({ error : err.message || "Server error"});

        return errorHandler(res, err);

    }
})

// POST User
router.post('/users', async(req, res) => {
    try {
        const {name, age} = req.body;

        if(!name || !age) {
            return errorHandler(res, err, 400);
        }
        
        const newUser = new User ({name, age}); 
        await newUser.save();
        
        // this is a response that we are going to give after save the data
        res.status(201).json({
            message: "User created",
            data: newUser 
        })
    } catch(err) {
        return errorHandler(res, err);
    }
})

// PUT User
router.put('/users/:id', async (req,res)=> {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true}
        );

        if(!updatedUser){
            return errorHandler(res, err, 404,"User not found")
        }

        res.json(updatedUser);
    }catch (err){
        return errorHandler(res, err);
    }
})

// DELETE User
router.delete('/users/:id', async(req,res) => {
    try{const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 
const errorHandler = require('../utils/errorHandler.js');

// I didn't know that the try catch to report a status 500 were necessary
// that equal is a bit repeated code

// GET User
router.get('/users', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err){

        // before
        // return res.status(500).json({ error : err.message || "Server error"});

        return errorHandler(res, err);

    }
})

// POST User
router.post('/users', async(req, res) => {
    try {

        const {name, age} = req.body;
        
        if(!name || !age) {
            return errorHandler(res, err, 400);
        }
        
        const newUser = new User ({name, age}); 
        await newUser.save();
        
        // this is a response that we are going to give after save the data
        res.status(201).json({
            message: "User created",
            data: newUser 
        })
    } catch(err) {
        return errorHandler(res, err);
    }
})

// PUT User
router.put('/users/:id', async (req,res)=> {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true}
        );

        if(!updatedUser){
            return errorHandler(res, err, 404,"User not found")
        }

        res.json(updatedUser);
    }catch (err){
        return errorHandler(res, err);
    }
})

// DELETE User
router.delete('/users/:id', async(req,res) => {
    try{
        // User is like the table we are modifying
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser){
            // old:
            // return res.status(404).json({error: "User not found"});
            return errorHandler(res, err, 404,"User not found")
        }

        res.json({ message : "User deleted"});
    }catch(err){
        return errorHandler(res, err);
    }
})

module.exports = router;
        // User is like the table we are modifying
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser){
            // old:
            // return res.status(404).json({error: "User not found"});
            return errorHandler(res, err, 404,"User not found")
        }

        res.json({ message : "User deleted"});
    }catch(err){
        return errorHandler(res, err);
    }
})

module.exports = router;