import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export const Navigation = () => {
  const history = useHistory();
  const inputSearch = React.useRef();
  const [inputValue, setInputValue] = React.useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    history.push({
      pathname: '/search',
      search: `?q=${inputValue}`,
    });

    setInputValue('');
    inputSearch.current.blur();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} exact to="/">
        React-Bootstrap
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact to="/">
            Главная
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            Эбаут ми
          </Nav.Link>
        </Nav>
        <Form inline onSubmit={handleFormSubmit}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={inputValue}
            ref={inputSearch}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};
