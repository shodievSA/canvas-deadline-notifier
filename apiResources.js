import { oneDay } from "./time.js";
import isUpcoming from "./utils/bot/isUpcoming.js";
import { createClient } from "redis";

const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

class Resources {

    // private fields
    #root = "https://canvas.instructure.com/api/v1/";
    #getCourses = async (token) => {

        try {

            const endpoint = `${this.#root}courses?enrollment_state=active`;

            const response = await fetch(endpoint, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const jsonResponse = await response.json();

            const courses = [];

            for (const { id, name } of jsonResponse) {

                courses.push({
                    id: id,
                    name: name.split("  ")[1]
                });

            }

            return courses;

        } 
        catch(error) {
            console.log(error);
        }

    };

    constructor(token) {

        this.getAssignments = async () => {

            let courses;

            const redisCache = await client.get("courses");

            if (redisCache !== null) {

                courses = JSON.parse(redisCache);

            } else {

                courses = await this.#getCourses(token);
                await client.set("courses", JSON.stringify(courses), {
                    EX: (oneDay * 7) / 1000
                });

            }

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

                    for (const assignment of jsonResponse) {

                        // converts ISO 8601 format into timestamp (ms since epoch)
                        const deadline = Date.parse(assignment.due_at);
    
                        // checks if an assignment expires within 24 hours
                        if (isUpcoming(deadline)) {
    
                            assignments.push({
                                deadline: deadline, 
                                assignment: assignment.name, 
                                course: course.name,
                                id: assignment.id 
                            });

                        }
                    }
                } catch(error) {
                    console.log(error);
                }
            }

            return assignments;
        }
    }   
}

export default Resources;
