const profileService = require('../services/profile.services.js');

exports.getProfile = async (req, res) => {
    const { userId } = req.params;
    console.log("userId", userId);
    const profile = await profileService.getProfileByUserId(userId);
    if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
    }
    console.log("profile", profile);
    res.status(200).json(profile);
};

exports.createOrUpdateProfile = async (req, res) => {
    const { userId } = req.body;
    const profile = await profileService.getProfileByUserId(userId);
    console.log("profile", profile);
    // if profile already exists, update it
    if (profile) {
        const updatedProfile = await profileService.updateProfileByUserId(userId, req.body);
        return res.status(200).json(updatedProfile);
    }

    // create new profile
    const newProfile = await profileService.createProfile(req.body);
    res.status(201).json(newProfile);
}

