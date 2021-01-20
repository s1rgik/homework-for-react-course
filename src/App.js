import React from 'react';
import Axios from 'axios';

import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = React.useState([]);
  const [payload, setPayload] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [query, setQuery] = React.useState('page=1');
  const page = React.useRef(1);
  const limit = React.useRef(10);
  const baseUrl = 'https://5c3755177820ff0014d92711.mockapi.io/users';

  let typingTimer = React.useRef();

  React.useEffect(() => {
    setPayload('loading');
    Axios.get(`${baseUrl}?limit=${limit.current}&${query}`)
      .then(({ data }) => {
        if (page.current === 1) {
          setUsers(data);
        } else {
          setUsers((users) => [...users, ...data]);
        }

        setPayload('loaded');

        if (data.length < limit.current) {
          setPayload('max');
        }

        if (!data.length && page.current === 1) {
          setPayload('notFound');
        }
      })
      .catch((err) => {
        setPayload('failed');
        alert('Ошибка при получении пользователей');
      });
  }, [query]);

  const nextPage = () => {
    if (payload !== 'max') {
      ++page.current;
      setQueryParameters(inputValue, page.current);
    }
  };

  const search = (searchStr) => {
    setInputValue(searchStr);
    setUsers([]);
    clearTimeout(typingTimer.current);
    page.current = 1;

    typingTimer.current = setTimeout(() => {
      setQueryParameters(searchStr, page.current);
    }, 500);
  };

  const setQueryParameters = (searchStr = '', page = 1) => {
    let searchParameters = searchStr ? `name=${searchStr}&page=${page}` : `page=${page}`;
    setQuery(searchParameters);
  };

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Поиск пользователя по имени и фамилии..."
        value={inputValue}
        onChange={(e) => search(e.target.value)}
      />

      {payload === 'notFound' ? 'нет пользователей' : null}
      {!users.length && payload !== 'notFound' ? 'Loading...' : null}
      {users.length ? <UsersList users={users} /> : null}

      {users.length && (payload === 'loading' || payload === 'loaded' || payload === 'failed') ? (
        <button onClick={nextPage} disabled={payload === 'loading' || payload === 'failed'}>
          {payload === 'loading' ? 'Wait...' : null}
          {payload === 'loaded' ? 'Next 10 users' : null}
        </button>
      ) : null}
    </div>
  );
}

export default App;
