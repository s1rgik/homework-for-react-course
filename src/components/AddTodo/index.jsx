import React from 'react';
import classNames from 'classnames';

import './AddTodo.sass';

export const AddTodo = ({ onAdd, payload }) => {
  const colors = React.useRef(['grey', 'blue', 'red', 'green', 'orange']);
  const inputRef = React.useRef();
  const [activeColor, setActiveColor] = React.useState(colors.current[0]);
  const [inputValue, setInputValue] = React.useState('');

  const keyUpInput = (event) => {
    if (event.key === 'Enter') {
      if (!inputValue || !activeColor) {
        alert('Введите текст задачи и выберите цвет');
      } else {
        onAdd(inputValue, activeColor);
        setActiveColor(colors.current[0]);
        setInputValue('');
        if (inputRef.current) inputRef.current.focus();
      }
    }
  };

  const changeInput = (event) => {
    setInputValue(event.target.value);
  };

  const changeColor = (color) => {
    setActiveColor(color);
  };

  return (
    <div className={classNames('todoAdd', { 'todoAdd--loading': !payload })}>
      <input
        type="text"
        placeholder="Текст задачи..."
        className="todoAdd__input"
        ref={inputRef}
        value={inputValue}
        onChange={changeInput}
        onKeyUp={keyUpInput}
      />
      <ul className="todoAdd__listColors">
        {colors.current.map((color, index) => (
          <li
            key={`${index}_${color}`}
            className={classNames('todoAdd__color', { active: activeColor === color })}
            style={payload ? { backgroundColor: `var(--${color})` } : null}
            onClick={() => changeColor(color)}
          />
        ))}
      </ul>
    </div>
  );
};
