
import React, {useState} from 'react';

export const TodoContext = React.createContext();

function TodoProvider(props) {

const [showCompleted, setShowCompleted] = useState(true);
const [numItems, setNumItems] = useState(3);
const [sortType, setSortType] = useState('difficulty');


    const state = {
        showCompleted, 
        numItems, 
        sortType,
        setShowCompleted,
        setNumItems,
        setSortType
    }

    return (
        <TodoContext.Provider value={state}>
            {props.children}
        </TodoContext.Provider>
    )
} 

export default TodoProvider;