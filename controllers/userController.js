const User = require('../model/User');
const bcrypt = require('bcrypt');

const createUser = async(req, res) => {
    try{
        const { username, password, roles } = req.body;
        if(!username || !password) return res.status(400).json({ 'message': 'Username and password are required' });
        
        // check for duplicate username in db
        const duplicate = await User.findOne({ username: username }).exec();
        if(duplicate) return res.sendStatus(409);
        const hashedPawd = await bcrypt.hash(password, 10);
        await User.create({ 
            "username": username, 
            "password": hashedPawd,
            "roles": roles
        });
        return res.status(201).json({ 'success': `New user ${username} created!`})
    }catch(err){
        return res.status(400).json({ 'message': 'Error creating user.'});
    }
}


const updateUser = async(req, res) => {
        
        if(!req?.body?.id) return res.status(400).json({ 'message': 'ID parameter is required'});

        try{

            const user = await User.findOne({ _id: req.body.id }).exec();
            if(!user) {
                return res.status(204).json({ 'message': `No user matches ID ${req.body.id}` });
            }
            if(req.body?.username) user.username = req.body.username;
            if(req?.body?.roles) user.roles = req.body.roles;
    
            const result = await user.save();
            res.json(result);
        } catch(err){
            return res.status(400).json({ 'message': `Error querying user`});
        }
    }

const deleteUser = async(req, res) => {
    try{
        if(!req?.body?.id) return res.status(400).json({ 'message': `User ID required`});
        const user = await User.findOne({ _id: req.body.id }).exec(); 
    
        if(!user) {
            return res.status(204).json({ 'message': `No user matches ID ${req.body.id}` });
        }
        const result = await user.deleteOne({ _id: req.body.id });
        return res.status(200).json(result);
    }catch(err){
        return res.status(400).json({ 'message': 'Error creating user.'});
    }
}

const getUser = async(req, res) => {
        if(!req?.body?.id) return res.status(400).json({ 'message': `User ID required`});
        
        try{
            const user = await User.findOne({ _id: req.params.id }).exec();    
            if(!user) {
                return res.status(204).json({ 'message': `No user matches ID ${req.params.id}` });
            }
            return res.status(200).json(user);
        } catch(err){
            return res.status(400).json({ 'message': 'ID not found'});
        }
    }


const getAllUsers = async(req, res) => {
    try{
        const user = await User.find();
        if(!user) return res.status(204).json({'message': 'No user found'});

        res.status(200).json(user);
    }catch(err){
        return res.status(400).json({ 'message': err});
    }
}


    module.exports = {
        getAllUsers,
        getUser,
        updateUser,
        deleteUser,
        createUser
    }