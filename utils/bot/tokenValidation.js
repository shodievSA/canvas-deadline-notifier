async function validateToken(token)
{
    const endpoint = "https://canvas.instructure.com/api/v1/users/self";

    try
    {
        const response = await fetch(endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return (response.ok) ? true : false;
    }
    catch (err)
    {
        console.log(err);
    }

}

export default validateToken;