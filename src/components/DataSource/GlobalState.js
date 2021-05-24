import {createContext,useReducer, useState} from 'react';
import AppReducer from './AppReducer';
const initialState = {};

export const AppContext = createContext(initialState);



export const GlobalContext =({children})=>{
    const [state,dispatch] = useReducer(AppReducer,initialState);
    return(
        <AppContext.Provider value={{listOfCountries:state,setList:dispatch}}>
            {children}
        </AppContext.Provider>
    );
}