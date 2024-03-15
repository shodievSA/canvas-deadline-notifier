import isUpcoming from "./utils/isUpcoming.js";

class Resources {

    #apiRoot = "https://canvas.instructure.com/api/v1/";

    constructor(token) {

        this.token = token,
        this.getCourses = async () => 
        {
            const parameter = "enrollment_state=active";

            try {
                const response = await fetch(`${this.#apiRoot}courses?${parameter}`, 
                {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                });

                const courses = await response.json();

                let result = [];

                for (const { id, name } of courses) {

                    result.push({
                        id: id,

                        // Captures only the name of the course (ignores course code and year)
                        name: name.split("  ")[1]
                    });

                }

                return result;
            } 
            catch(error) {
                console.log(error);
            }
        },
        this.getAssignments = async () => 
        {
            const parameter = "bucket=unsubmitted";
            const courses = await this.getCourses();

            let result = [];

            for (const course of courses) {

                const endpoint = `courses/${course.id}/assignments`;

                try {
                    const response = await fetch(`${this.#apiRoot}${endpoint}?${parameter}`, 
                    {
                        headers: {
                            "Authorization": `Bearer ${this.token}`
                        }
                    });

                    const assignments = await response.json();

                    for (const assignment of assignments) {

                        // converts ISO 8601 format into timestamp (ms since epoch)
                        const deadline = Date.parse(assignment.due_at);
    
                        if (isUpcoming(deadline)) {
    
                            result.push({
                                deadline: deadline, 
                                assignment: assignment.name, 
                                course: course.name,
                                id: assignment.id 
                            });

                        }
                    }
                } catch(error) 
                {
                    console.log(error);
                }
            }

            return result;
        }
    }   
}

export default Resources;
