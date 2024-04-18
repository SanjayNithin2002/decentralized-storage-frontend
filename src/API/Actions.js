import fetchAPI from './fetchAPI';

const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw Error('Login again.');
    }
    return token;
}

const getDepartment = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.department) {
        throw Error('Login again.');
    }
    return user.department;
}

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
        },
    })
};

const getUsersByDept = async () => {
    try {
        return fetchAPI({
            method: 'GET',
            endpoint: `users/dept/${getDepartment()}`,
            token: getToken()
        })
    } catch (error) {
        throw error;
    }
};

const approveUserById = async (id) => {
    try {
        return fetchAPI({
            method: 'PATCH',
            endpoint: `users/approve/${id}`,
            token: getToken()
        })
    } catch (error) {
        throw error;
    }
};

const deleteUserById = async (id) => {
    try {
        return fetchAPI({
            method: 'DELETE',
            endpoint: `users/${id}`,
            token: getToken()
        })
    } catch (error) {
        throw error;
    }
};

const postFile = async (props) => {
    const { title, role, key, file } = props;
    return fetchAPI({
        method: 'POST',
        endpoint: `files`,
        body: {
            title,
            role,
            key,
            file
        },
        token: getToken(),
        postFile: true
    });
};

const getFilesByDept = async () => {
    try {
        return fetchAPI({
            method: 'GET',
            endpoint: `files/dept/${getDepartment()}`,
            token: getToken()
        })
    } catch (error) {
        throw error;
    }
};

const getFileById = async ({ id, key }) => {
    try {
        return fetchAPI({
            method: 'POST',
            endpoint: `files/${id}`,
            token: getToken(),
            body: {
                key
            },
            postFile: true,
            downloadFile: true
        })
    } catch (error) {
        throw error;
    }
}

const verifyFileById = async ({ id, key }) => {
    try {
        return fetchAPI({
            method: 'POST',
            endpoint: `files/integrity/${id}`,
            token: getToken(),
            body: {
                key
            },
            postFile: true,
        })
    } catch (error) {
        throw error;
    }
}

const deleteFileById = async (id) => {
    try {
        return fetchAPI({
            method: 'DELETE',
            endpoint: `files/${id}`,
            token: getToken(),
        })
    } catch (error) {
        throw error;
    }
}

const clearKeys = async () => {
    try {
        return fetchAPI({
            method: 'POST',
            endpoint: `dataowners/clearkeys`,
            token: getToken(),
        })
    } catch (error) {
        throw error;
    }
}

const generateKeys = async () => {
    try {
        return fetchAPI({
            method: 'GET',
            endpoint: `dataowners/secretkeys`,
            token: getToken(),
            downloadFile: true
        })
    } catch (error) {
        throw error;
    }
}

const getKeys = async () => {
    try {
        return fetchAPI({
            method: 'GET',
            endpoint: `users/secretkeys`,
            token: getToken(),
            downloadFile: true
        })
    } catch (error) {
        throw error;
    }
}

export { loginUser, signupUser, getUsersByDept, approveUserById, deleteUserById, postFile, getFilesByDept, getFileById, verifyFileById, deleteFileById, clearKeys, generateKeys, getKeys };
