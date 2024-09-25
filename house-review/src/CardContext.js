import {createContext, useReducer} from 'react'

export const CardContext = createContext()

export const cardsReducer = (state, action) => {
    switch (action.type)
    {
        case 'SET_CARDS':
            return {
                reviews: action.payload
            }
        
        case 'CREATE_CARD':
            return {
                reviews: [action.payload, ...state.reviews]
            }
        
        default:
            return state
    }
}

export const CardContextProvider = ({children}) => { //children represents app component
    const [state,dispatch] = useReducer(cardsReducer,{
        reviews: []
    })

    return (
        <CardContext.Provider value={{...state,dispatch}}>
            { children }
        </CardContext.Provider>
    )
}