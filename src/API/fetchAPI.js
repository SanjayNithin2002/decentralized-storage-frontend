const fetchAPI = async (props) => {
    const { method, endpoint, body = {}, token = '' } = props;
    let options;
    if (method === 'POST') {
        options = {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `beaer ${token}`
            }
        };
    }
    else {
        options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
    }

    try {
        const response = await fetch(`https://decentralized-storage-backend.onrender.com/${endpoint}`, options);
        const data = await response.json();
        data.status = response.status
        return data;
    } catch (error) {
        throw error;
    }
}

const fetchAPIForFile = async (props) => {
    const { method, endpoint, token, body } = props;
    const formData = new FormData();

    for (const key in body) {
        formData.append(key, body[key]);
    }

    const options = {
        method: method,
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(`https://decentralized-storage-backend.onrender.com/${endpoint}`, options);
        const data = await response.json();
        data.status = response.status;
        return data;
    } catch (error) {
        throw error;
    }
};


export { fetchAPI, fetchAPIForFile };