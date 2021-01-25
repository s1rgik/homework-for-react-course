import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export const PostsList = ({ posts }) => {
  return (
    <Row className="justify-content-between m-0 mt-3 mb-3">
      {posts.map((post) => (
        <Card key={post.id} className="float-left mt-2 mb-2" style={{ width: '22rem' }}>
          <Card.Img variant="top" src={post.image} />
          <Card.Body>
            <NavLink to={`/post/${post.id}`}>
              <Card.Title>{post.title}</Card.Title>
            </NavLink>
            <Card.Text style={{ height: '75px' }}>{post.text}</Card.Text>
          </Card.Body>
          <Card.Footer>{post.createdAt}</Card.Footer>
        </Card>
      ))}
    </Row>
  );
};
