module.exports = (sequelize, Sequelize) => {
    const Dharmshala = sequelize.define('Dharmshala', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contact: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users', // 'Users' refers to table name
                key: 'id', // 'id' refers to column name in Users table
            }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    return Dharmshala;
};