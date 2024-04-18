const validateLogin = () => {
    var loginTime = localStorage.getItem('loginTime');
    console.log(loginTime);
    loginTime = loginTime ? parseInt(loginTime, 10) : null;
    if (loginTime === null || (Date.now() - loginTime > 24.95 * 60 * 60 * 1000)) {
        localStorage.clear();
        return false;
    }
    else {
        return true;
    }
}

export default validateLogin;