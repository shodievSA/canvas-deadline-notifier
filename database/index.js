import { Sequelize, DataTypes } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`
);


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