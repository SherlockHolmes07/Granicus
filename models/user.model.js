module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mobile: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                  args: [10, 15],
                  msg: "Mobile number length should be between 10 and 15 characters"
                },
                is: {
                  args: /^[0-9]+$/i,
                  msg: "Mobile number should only contain digits"
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isEmail: {
                  args: true,
                  msg: "Must be a valid email address"
                }
            }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    return User;
};