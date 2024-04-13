const signupUser = async (props) => {
    console.log(props);
    const {userType, name, email, password, department, role=""} = props;
    const options = {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password, 
            department, 
            role
        }),
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(`https://decentralized-storage-backend.onrender.com/${userType}/signup`, options);
        const data = await response.json();
        console.log(data);
        data.userType = userType;
        data.status = response.status
        return data;
    } catch (error) {
        throw error;
    }
};

export { signupUser };
