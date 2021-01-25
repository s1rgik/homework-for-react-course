import React from 'react';
import { Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { FullPost } from './pages/FullPost';
import { About } from './pages/About';
import { Navigation } from './components/Navigation';

import { Row } from 'react-bootstrap';

const apiUrl = 'https://5c3755177820ff0014d92711.mockapi.io';

function App() {
  return (
    <div className="container">
      <Row className="d-block m-0">
        <Navigation />
      </Row>
      <Row className="d-block m-0 mt-4 mb-4">
        <Route exact path="/" component={(props) => <Home {...props} apiUrl={apiUrl} />} />
        <Route path="/post/:id" component={(props) => <FullPost {...props} apiUrl={apiUrl} />} />
        <Route path="/about" component={(props) => <About {...props} apiUrl={apiUrl} />} />
        <Route path="/search" component={(props) => <Search {...props} apiUrl={apiUrl} />} />
      </Row>
    </div>
  );
}

export default App;
