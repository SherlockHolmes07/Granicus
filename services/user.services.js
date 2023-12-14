const db = require('../models');
const User = db.users;

// Create and Save a new User
const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

// Retrieve a User by mobile number
const getUserByMobile = async (mobile) => {
    try {
        const user = await User.findOne({ where: { mobile: mobile } });
        return user;
    } catch (error) {
        throw error;
    }
};

// Update a User by the id in the request
const updateUser = async (id, userData) => {
    try {
        const user = await User.update(userData, {
            where: {
                id: id
            }
        });
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUserByMobile,
    updateUser
};