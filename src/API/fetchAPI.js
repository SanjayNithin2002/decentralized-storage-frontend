const generateBody = (body) => {
    return JSON.stringify(body);
}

const generateFormData = (body) => {
    const formData = new FormData();
    Object.keys(body).map(key => formData.append(key, body[key]));
    return formData;
}

const fetchJSON = async (props) => {
    const { endpoint, options } = props;
    try {
        const response = await fetch(`https://decentralized-storage-backend.onrender.com/${endpoint}`, options);
        const data = await response.json();
        data.status = response.status;
        return data;
    } catch (error) {
        throw error;
    }
}

const fetchFile = async (props) => {
    const { endpoint, options } = props;
    try {
        const response = await fetch(`https://decentralized-storage-backend.onrender.com/${endpoint}`, options);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.startsWith('application/json')) {
            const data = await response.json();
            data.status = response.status;
            return data;
        } else {
            const blob = await response.blob();
            return blob;
        }
    } catch (error) {
        throw error;
    }
}

const fetchAPI = async (props) => {
    const { method, endpoint, body = {}, token = '', postFile = false, downloadFile = false } = props;
    let options = {
        method: method,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };
    if (method === 'POST') {
        options['body'] = postFile ? generateFormData(body) : generateBody(body);
        if (!postFile)
            options['headers']['Content-Type'] = "application/json"
    }
    return downloadFile ? fetchFile({ endpoint, options }) : fetchJSON({ endpoint, options });
}

export default fetchAPI;