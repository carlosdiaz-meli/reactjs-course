import React from 'react';
import PropTypes from 'prop-types';
import { TodoListItem } from './TodoListItem';

export const TodoList = ( { todos, handleDelete, handleToggle } ) => {
    return (
        <ul className="list-group list-group-flush">
            {
                todos.map((todo, i) => 
                    <TodoListItem
                        handleDelete={ handleDelete }
                        handleToggle={ handleToggle }
                        index={ i }
                        todo={ todo }
                        key={ todo.id }
                    />
                )
            }
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired
}
