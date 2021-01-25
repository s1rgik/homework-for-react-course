import React from 'react';
import Axios from 'axios';

import { Post } from '../components/Post';
import { CommentsList } from '../components/CommentsList';

import { Row } from 'react-bootstrap';

export const FullPost = ({ match, apiUrl }) => {
  const id = match.params.id;
  const [post, setPost] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [isloadPost, setIsloadPost] = React.useState(false);
  const [isloadComments, setIsloadComments] = React.useState(false);

  const fetchComments = async () => {
    try {
      const newPost = await Axios.get(`${apiUrl}/posts/${id}`);
      setPost(newPost.data);
      setIsloadPost(true);

      if (newPost.data) {
        const newComments = await Axios.get(`${apiUrl}/posts/${id}/comments`);
        setComments(newComments.data);
        setIsloadComments(true);
      }
    } catch (error) {
      alert('Возникла ошибка');
    }
  };

  React.useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="d-block m-0">
      {isloadPost ? <Post post={post} /> : 'Загрузка статьи...'}
      <h3 className="mb-3 mt-4">Комментарии:</h3>
      {!isloadComments && 'Загрузка комметариев...'}
      {isloadComments && !comments.length && 'Нет комментариев'}
      {isloadComments && comments.length > 0 && <CommentsList comments={comments} />}
    </Row>
  );
};
