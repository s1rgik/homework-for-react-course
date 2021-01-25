import Card from 'react-bootstrap/Card';

export const Post = ({ post }) => {
  return (
    <Card key={post.id} className="mt-4">
      <Card.Img variant="top" src={post.image} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.text}</Card.Text>
      </Card.Body>
      <Card.Footer>{post.createdAt}</Card.Footer>
    </Card>
  );
};
