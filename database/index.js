import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:abbos2504@localhost:5432/postgres');


export const User = sequelize.define('User', {
    telegramId: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    canvasToken: {
        type: DataTypes.STRING,
    }
});

// Sync the model with the database without forcing recreation
sequelize.sync()
    .then(() => {
        console.log("Database synchronized with models");
    })
    .catch(error => {
        console.error("Error synchronizing database:", error);
    });