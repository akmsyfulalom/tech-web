import { createContext, useEffect, useState, useReducer } from "react";
import { userChecker } from "../authentication/userChecker";

// const userChecker = (param) =>{
//     //const user = JSON.parse(param)
//     const response = fetch('/checkUser',{
//         headers:{
//             "Authorization":`Bearer ${param.token}`
//           }
//     })
//         const result = res.json();
//         console.log(result)
//         //return result;

// }
export const AuthContext=createContext();

export const authReducer=(state,action)=>{
    switch (action.type){
        case 'login':
            return {user: action.payload, userType:null}
        case 'logout':
            return {user: action.payload, userType:null}
        case 'setUser':
            return {user: state.user, userType: action.payload}
    }
}
export const AuthContextProvider=({children})=>{

    //const [usType,setUsType]=useState();
    let usType
    const [state,dispatch]=useReducer(authReducer,{
        user: null,
        userType: null
    })
    useEffect( ()=>{
        const isLogged=JSON.parse(localStorage.getItem('user'));
        if(isLogged)
        {
        const getUser = async ()=>{ 
            usType = await userChecker(isLogged)
            dispatch({type:'login',payload:isLogged});
            dispatch({type:'setUser',payload:usType});
        }
            getUser();
        }

    },[])
    console.log(state);

    return (
    <AuthContext.Provider value={{...state,dispatch}}>
    {children}
    </AuthContext.Provider>
    )
}
