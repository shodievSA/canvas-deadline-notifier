import { User } from '../../database/index.js';

async function registerUserOnDB(user) {
    try {
        const existingUser = await User.findOne({ where: { telegramId: user.id } });
        
        if (existingUser) {
            console.log("User found");
        } else {
            const data = {
                telegramId: user.id,
                phoneNumber: user.phone_number,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
            };

            const newUser = await User.create(data);
            console.log("User created successfully:", newUser.get());
        }
    } catch (error) {
        console.error("Something went wrong!", error);
    }
}

export default registerUserOnDB;
