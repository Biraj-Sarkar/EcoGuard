import User from '../models/User.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Register a new user
export const registerUser  = async (username, password) => {
    // Check if the user already exists
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
        throw new Error('User  already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ username, password: hashedPassword });
    await newUser .save();

    // Create a new user
    // const newUser  = new User({ username, password }); // Make sure to hash the password before saving
    // await newUser .save();

    return newUser ;
};

// Login a user
export const loginUser  = async (username, password) => {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Check password (compare hashed password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Check password (make sure to compare hashed passwords)
    // if (user.password !== password) { // Use a hashing function in a real app
    //     return res.status(400).json({ message: 'Invalid credentials' });
    // }

    return user; // Return the user object (or any other relevant info)
};
