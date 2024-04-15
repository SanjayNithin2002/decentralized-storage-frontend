const fetchAPI = async (props) => {
    const { method, endpoint, body = {}, token = '' } = props;
    let options;
    if (method === 'GET') {
        options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `beaer ${token}`
            }
        };
    }
    else {
        options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `beaer ${token}`
            }
        };
    }

    try {
        const response = await fetch(`https://decentralized-storage-backend.onrender.com/${endpoint}`, options);
        const data = await response.json();
        console.log(data);
        data.status = response.status
        return data;
    } catch (error) {
        throw error;
    }
}

export default fetchAPI;