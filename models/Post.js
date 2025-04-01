import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
       
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,//relacion entre post y usuario
        ref: 'User',//referencia al modelo de usuario
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;