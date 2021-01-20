import React from 'react';

import Card from './components/Card';
import data from './db.json';

function App() {
  return (
    <div className="container">
      <div className="card-columns">
        {data.map((obj, index) => (
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
