import React from 'react';
import Axios from 'axios';

import UsersList from './components/UsersList';

function App() {
  const [inputValue, setInputValue] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [payload, setPayload] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const limit = 10;

  React.useEffect(() => {
    setPayload('loading');
    Axios.get(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${page}&limit=${limit}`)
      .then(({ data }) => {
        setUsers((u) => [...u, ...data]);
        data.length ? setPayload('loaded') : setPayload('max');
      })
      .catch((err) => {
        setPayload('failed');
        alert('Ошибка при получении пользователей');
      });
  }, [page]);

  const nextPage = (e) => {
    if (payload !== 'max') {
      setPage(page + 1);
    }
  };

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Поиск пользователя..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {users.length ? <UsersList users={users} filter={inputValue} /> : 'Loading...'}
      {users.length && payload !== 'max' && payload !== 'failed' ? (
        <button onClick={nextPage} disabled={payload === 'loading' || payload === 'failed'}>
          {payload === 'loading' ? 'Wait...' : null}
          {payload === 'loaded' ? 'Next 10 users' : null}
        </button>
      ) : null}
    </div>
  );
}

export default App;
