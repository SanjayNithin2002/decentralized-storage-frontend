import fetchAPI from './fetchAPI';

const loginUser = async (props) => {
    const { email, password, userType } = props;
    return fetchAPI({
        method: 'POST',
        endpoint: `${userType}/login`,
        body: {
            email,
            password
        }
    })
};

const signupUser = async (props) => {
    const { userType, name, email, password, department, role = "" } = props;
    return fetchAPI({
        method: 'POST',
        endpoint: `${userType}/signup`,
        body: {
            email,
            password,
            name,
            department,
            role
        }
    })
};

const getUsersByDept = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const dept = user.department;
        const token = localStorage.getItem('token');
        if (token === null || dept === null) {
            throw Error('Login again.');
        }
        return fetchAPI({
            method: 'GET',
            endpoint: `users/dept/${dept}`,
            token: token
        })
    } catch (error) {
        throw error;
    }
};

export { loginUser, signupUser, getUsersByDept };
