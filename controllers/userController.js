const User = require('../model/User');

const createUser = async(req, res) => {
    try{
        if(!req?.body?.username || !req?.body?.password || !req?.body?.roles){
            return res.status(204).json({ 'message': 'Please fill all required fields'});
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            roles: req.body.roles
        });
    }catch(err){
        return res.status(400).json({ 'message': 'Error creating user.'});
    }
}