const loginUser = async (props) => {
    const {email, password, userType} = props;
    const options = {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(`https://decentralized-storage-backend.onrender.com/${userType}/login`, options);
        const data = await response.json();
        console.log(data);
        data.userType = userType;
        data.status = response.status
        return data;
    } catch (error) {
        throw error;
    }
};

export { loginUser };
