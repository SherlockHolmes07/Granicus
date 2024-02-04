module.exports = (sequelize, Sequelize) => {
    const Otp = sequelize.define('Otp', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        otp: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        mobileNumber: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        expiry: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP + INTERVAL \'10 minute\')')
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    return Otp;
};