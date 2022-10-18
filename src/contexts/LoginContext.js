import React, { createContext, useState, useEffect } from 'react';

const LoginContext = createContext();
const LoginState = (props) => {


    const { Provider } = LoginContext;

    const [user, setuser] = useState({})

    const updateUser = (userData) => {

        setuser({ ...user, userData })


    }
   



    return (
        <LoginContext.Provider value={{ user, updateUser }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export { LoginState, LoginContext }


