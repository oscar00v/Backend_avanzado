import mongoose from "mongoose";

//** User Schema se trae el esquema del usuario
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    }
});

const User = mongoose.model('User', UserSchema);
export default User;