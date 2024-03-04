/* eslint-disable default-case */
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return { user: action.payload }
        case 'logout':
            return { user: action.payload }
    }
}
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem('user'));
        if (isLogged) {
            dispatch({ type: 'login', payload: isLogged });
        }
    }, [])
    console.log(state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}