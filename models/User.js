import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        select: false // No mostrar la contraseña por defecto
    }
});

//metodo para hasear el pasword antes de guardar el usuario
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', UserSchema);
export default User;
