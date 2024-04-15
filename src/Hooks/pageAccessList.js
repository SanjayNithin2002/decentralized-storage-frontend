import PageAccess from '../Resources/PageAccess.json';

const pageAccessList = (userType) => {
    return PageAccess[userType];
}

export default pageAccessList;