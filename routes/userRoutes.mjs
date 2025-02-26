import express from 'express'
import bcrypt from 'bcryptjs';
import User from '../models/user.mjs';

const router = express.Router();

// Register User
router.post('/register', async(req, res) => {
    try {
        const { name , email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exist" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User register successfully" });
    }   catch(err) {
        res.status(500).json({ message: "Server error", err: err.message  });
    }
});

export default router;