import { oneDay } from "./time.js";
import { createClient } from "redis";
import isUpcoming from "./utils/bot/isUpcoming.js";

const client = await createClient()
.on('error', (err) => console.log('Redis Client Error', err))
.connect();

class Resources {

    #root = "https://canvas.instructure.com/api/v1/";
    #getCourses = async (token) => {
        try {

            console.log(token)

            const endpoint = `${this.#root}courses?enrollment_state=active`;

            const response = await fetch(endpoint, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const jsonResponse = await response.json();

            const courses = [];

            if (jsonResponse.length <= 0)
            {
                return;
            }

            for (const { id, name } of jsonResponse) {

                courses.push({
                    id: id,
                    name: name
                });

            };

            return courses;

        } 
        catch(error) {
            console.log(error);
        };

    };

    constructor(token, userID) {

        this.getAssignments = async () => {

            let courses;

            const redisCache = await client.get(`user:${userID}:telegram_id`);

            if (redisCache !== null) {

                courses = JSON.parse(redisCache);

            } else {

                courses = await this.#getCourses(token);

                await client.set(`user:${userID}:telegram_id`, JSON.stringify(courses), {
                    EX: (oneDay * 7) / 1000
                });

            };

            let assignments = [];

            for (const course of courses) {

                try {

                    const endpoint = `${this.#root}courses/${course.id}/assignments?bucket=unsubmitted`;

                    const response = await fetch(endpoint, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    const jsonResponse = await response.json();

                    if (jsonResponse.length <= 0)
                    {
                        return;
                    }

                    for (const assignment of jsonResponse) {
    
                        if (isUpcoming(assignment)) {
    
                            assignments.push({
                                deadline: assignment.due_at, 
                                assignment: assignment.name, 
                                course: course.name,
                                id: assignment.id 
                            });

                        };

                    };

                } catch(error) {
                    console.log(error);
                };
            };

            return assignments;
        };
    };  
};

export default Resources;
