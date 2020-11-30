import React,{createContext, useContext,useReducer} from 'react';

// Here we create context for data Layer
export const StateContext=createContext();

// Here is the datalayer linked to a high order component
export const StateProvider = ({reducer, initialState, children})=>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>   
    
    );

export const useStateValue = () =>  useContext(StateContext);
