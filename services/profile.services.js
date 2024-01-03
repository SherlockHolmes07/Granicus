const db = require('../models');
const Profile = db.profiles;

// Fetch a profile by user ID
exports.getProfileByUserId = async (userId) => {
    const profile = await Profile.findOne({
        where: { userId: userId }
    });
    return profile;
};

// Create a new profile
exports.createProfile = async (profileData) => {
    const profile = await Profile.create(profileData);
    return profile;
};

// Update a profile by user ID
exports.updateProfileByUserId = async (userId, profileData) => {
    const profile = await Profile.update(profileData, {
        where: { userId: userId }
    });
    return profile;
};