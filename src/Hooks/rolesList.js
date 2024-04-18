import Roles from '../Resources/Roles.json';

const getDepartments = () => {
    return Object.keys(Roles);
}

const getRoles = (department) => {
    return Roles[department];
}

export {getDepartments, getRoles};