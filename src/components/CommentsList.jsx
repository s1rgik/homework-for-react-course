import Card from 'react-bootstrap/Card';

export const CommentsList = ({ comments }) => {
  return (
    <>
      {comments.map((obj) => (
        <Card key={obj.id} className="mb-4">
          <Card.Body>
            <Card.Subtitle>{obj.name}</Card.Subtitle>
            <Card.Text>{obj.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
