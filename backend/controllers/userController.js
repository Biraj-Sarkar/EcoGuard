import * as userService from '../services/userService.js';

// Register a new user
export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        await userService.registerUser (username, password);
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        res.status(error.message === 'User  already exists' ? 400 : 500).json({ message: error.message });
    }
};

// Login a user
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userService.loginUser (username, password);
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
