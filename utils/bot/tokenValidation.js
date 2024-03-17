async function validateToken(token)
{
    const endpoint = "https://canvas.instructure.com/api/v1/users/self";

    const response = await fetch(endpoint, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return (response.ok) ? true : false;
}

export default validateToken;