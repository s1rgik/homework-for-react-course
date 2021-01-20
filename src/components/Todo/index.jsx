import React from 'react';
import classNames from 'classnames';

import './Todo.sass';

export const Todo = ({ id, text, color, completed, onEdit, onDelete, onCompleted, payload }) => {
  const onEditClick = () => {
    if (onEdit) {
      onEdit(id);
    }
  };
  const onDeleteClick = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const onCompletedChange = () => {
    if (onCompleted) {
      onCompleted(id);
    }
  };

  return (
    <div className={classNames('todoApp__todo', 'todo', { 'todo--loading': !payload })}>
      <label className="todo__label" htmlFor={`todo-${id}`}>
        <input
          type="checkbox"
          className="todo__checkbox"
          id={`todo-${id}`}
          onChange={onCompletedChange}
          checked={completed}
        />
        <div className="todo__fakeCheckbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="todo__iconInCheckbox">
            <path d="M505 75a26 26 0 00-37 0L162 382 44 264a26 26 0 00-37 37l136 136c10 10 27 9 37 0l325-325c10-10 9-27 0-37z"></path>
          </svg>
        </div>
      </label>
      <div
        className="todo__delimiter"
        style={payload ? { backgroundColor: `var(--${color})` } : null}></div>
      <p className="todo__text">{text}</p>
      <div className="todo__actions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 384"
          className="todo__iconAction"
          onClick={onEditClick}>
          <path d="M0 304v80h80l236-236-80-80zM378 56L328 6c-8-8-22-8-30 0l-39 39 80 80 39-39c8-8 8-22 0-30z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 96 96"
          className="todo__iconAction"
          onClick={onDeleteClick}>
          <path d="M63 48l32-33v-2L83 1a2 2 0 00-2 0L48 33 15 1h-2L1 13v2l32 33L1 81v2l12 12a2 2 0 002 0l33-32 33 32a2 2 0 002 0l12-12v-2L63 48z"></path>
        </svg>
      </div>
    </div>
  );
};
