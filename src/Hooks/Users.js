const getUsersByDept = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const dept = user.department;
        const token = localStorage.getItem('token');
        if(token === null || dept === null){
            throw Error('Login again.');
        }
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        };
        const response = await fetch(`https://decentralized-storage-backend.onrender.com/users/dept/${dept}`, options);
        const data = await response.json();
        console.log(data);
        data.status = response.status
        return data;
    } catch (error) {
        throw error;
    }
};

export { getUsersByDept };
