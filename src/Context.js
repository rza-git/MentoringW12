import React, {useReducer} from 'react';

const initialState = {
    moves: 0
}

const actions = {
    ADD_MOVES: "ADD_MOVES"
}

const reducer = (state, action) => {
    switch(action.type) {
        case actions.ADD_MOVES:
            return {
                ...state,
                moves: state.moves + 1
            }
        default:
            return state;
    }
}

export const CardContext = React.createContext();

export const CardProvider = ({children}) => {

    const [state, dispatch]  = useReducer(reducer, initialState);

    const value = {
        moves: state.moves,
        addMoves: () => {
            dispatch({type: actions.ADD_MOVES})
        }
    }

    return (
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    )
}