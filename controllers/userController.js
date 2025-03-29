import User from '../models/user.js';

export const createUser = async (req, res) => {
    try {
        const users = new User(req.body);//!crea objetos
        await users.save();
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();//?get the user
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

 export const deleteUser = async (req, res) => {
    try{
        const user = await User.findOneAndDelete({email: req.params.email});
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json({message: 'User deleted successfully'});
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}
