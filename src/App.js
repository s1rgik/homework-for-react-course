import React from 'react';
import classNames from 'classnames';

import { AddTodo } from './components/AddTodo';
import { Todo } from './components/Todo';

function App() {
  const autoincrement = React.useRef(0);
  const [todos, setTodos] = React.useState([]);
  const [payload, setPayload] = React.useState(false);

  React.useEffect(() => {
    const localStorageTodos = localStorage.getItem('todos');
    const localStorageAI = localStorage.getItem('autoincrement');

    autoincrement.current = localStorageAI ?? 0;
    setTodos(JSON.parse(localStorageTodos) ?? []);

    setPayload(true);
  }, []);

  const onAddTodo = (text, color) => {
    const todo = {
      id: ++autoincrement.current,
      text,
      color,
      completed: false,
    };
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos, todo];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
    localStorage.setItem('autoincrement', autoincrement.current);
  };

  const onEditTodo = (id) => {
    const todo = todos.filter((item) => {
      return item.id === id;
    });

    const newText = window.prompt('Текст задачи', todo[0].text);
    if (newText) editTodo({ id, newText });
  };

  const onDeleteTodo = (id) => {
    if (window.confirm('Вы действительно хотите удалить?')) {
      setTodos((prevTodos) => {
        const newTodos = prevTodos.filter((todo) => {
          return todo.id !== id;
        });
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return newTodos;
      });
    }
  };

  const onCompletedTodo = (id) => {
    const todo = todos.filter((item) => {
      return item.id === id;
    });

    editTodo({ id, newCompleted: !todo[0].completed });
  };

  const editTodo = ({ id, newText, newColor, newCompleted }) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          text: newText ?? todo.text,
          color: newColor ?? todo.color,
          completed: newCompleted ?? todo.completed,
        };
      });
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  return (
    <div className={classNames('todoApp', { noclick: !payload })}>
      <h2 className="todoApp__title">Список задач</h2>
      <div className="todoApp__todos">
        {!payload && [...Array(3)].map((_, index) => <Todo key={index} payload={payload} />)}

        {payload && todos.length === 0 ? (
          <p className="todoApp__noTodo">
            У Вас еще нет задач. Для добавления задачи воспользуйтесь расположенной ниже формой.
          </p>
        ) : null}

        {payload && todos.length > 0
          ? todos.map((item, index) => (
              <Todo
                key={`${index}_${item.id}`}
                {...item}
                onEdit={onEditTodo}
                onDelete={onDeleteTodo}
                onCompleted={onCompletedTodo}
                payload={payload}
                addTodo={<AddTodo onAdd={onAddTodo} payload={payload} />}
              />
            ))
          : null}
      </div>
      <div className="todoApp__footer">
        <AddTodo onAdd={onAddTodo} payload={payload} />
      </div>
    </div>
  );
}

export default App;
