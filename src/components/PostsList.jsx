import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export const PostsList = ({ posts }) => {
  return (
    <div
      className="mt-3 mb-3"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '16px',
      }}>
      {posts.map((post) => (
        <Card key={post.id} className="float-left mt-2 mb-2">
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
    </div>
  );
};
