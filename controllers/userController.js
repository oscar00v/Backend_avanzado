import User from '../models/user.js';
import Post from '../models/Post.js';
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
//cambiar los valores de un usuario
export const updateUser = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate({email: req.params.email}, req.body, {new: true});
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

//post

export const getPost = async (req, res) => {
    try{
        const post = await Post.find().populate('user', 'name email')
        res.status(201).json(post);

    }catch(error){
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const {
        title,
        userId
    } = req.body;
    //verificar si el usuario existe
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({message: 'User not found'});

 
        const post = new Post({
            title,
            user: userId
        });
        try{

        
        await post.save();
        res.status(201).json(post);
    }catch(error){
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}