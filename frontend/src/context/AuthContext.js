import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn : false,
    token : null,
    name : "",
    isOpen : false,
    message : "",
    type : "",
    onClose : () => {},
    onConfirm : () => {},

    login : () => {},
    logout : () => {}
})

export default AuthContext;
