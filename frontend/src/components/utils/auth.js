import {jwtDecode}  from 'jwt-decode';

const isValidToken = (token) => {
    if (!token) {
        return true; 
    }
    try{

        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    }
    catch(e) {

        return true;
    }
};

export const verifyToken = (token) => {
    if (!token || isValidToken(token)) {
        return false;
    }
    return true;
};