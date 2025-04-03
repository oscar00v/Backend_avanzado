import User from '../models/user.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d'})
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({email});

    if (userExist) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({name, email, password});

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message: 'Invalid User data' });
    }
}

export const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Asegurarse de obtener el password para compararlo
        const userExist = await User.findOne({ email }).select("+password");

        if (userExist && (await bcrypt.compare(password, userExist.password))) {
            res.json({
                _id: userExist._id,
                name: userExist.name,
                email: userExist.email,
                token: generateToken(userExist._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

