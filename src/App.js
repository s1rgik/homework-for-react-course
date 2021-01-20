import React from 'react';
import Axios from 'axios';

import Card from './components/Card';

function App() {
  const [cards, setCards] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    Axios.get('https://trycode.pw/c/37Z2Q.json').then(({ data }) => {
      setCards(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="input-group mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder={`Поиск по ${cards.length} рецептам...`}
          aria-label={`Поиск по ${cards.length} рецептам...`}
          aria-describedby="basic-addon2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="card-columns">
        {cards
          .filter(
            (obj) =>
              obj.title.toLowerCase().includes(inputValue.toLowerCase()) ||
              obj.description.toLowerCase().includes(inputValue.toLowerCase()),
          )
          .map((obj, index) => (
            <Card
              key={`${index}_${obj.image}`}
              imgUrl={obj.image}
              title={obj.title}
              text={obj.description}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
