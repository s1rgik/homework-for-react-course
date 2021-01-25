import React from 'react';
import Axios from 'axios';

import { PostsList } from '../components/PostsList';
import { Row, Button } from 'react-bootstrap';

const limit = 9;

export const Home = ({ apiUrl }) => {
  const [posts, setPosts] = React.useState([]);
  const [payload, setPayload] = React.useState();
  const [page, setPage] = React.useState(1);

  const fetchPosts = async () => {
    try {
      setPayload('loading');

      const { data } = await Axios.get(`${apiUrl}/posts?limit=${limit}&page=${page}`);

      setPosts((prevPosts) => [...prevPosts, ...data]);

      if (data.length < limit) {
        setPayload('max');
      } else {
        setPayload('loaded');
      }
    } catch (error) {
      setPayload('failed');
      alert('Ошибка при получении статей');
    }
  };

  React.useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const _showButton = () => {
    if (posts.length && (payload === 'loading' || payload === 'loaded')) return true;
    return false;
  };

  return (
    <Row className="d-block m-0 mb-4 mt-4">
      {!posts.length && payload === 'loading' && <p>Загрузка...</p>}
      {posts.length > 0 && <PostsList posts={posts} />}
      {_showButton() && (
        <Row className="justify-content-center">
          <Button
            variant="primary"
            disabled={payload === 'loading'}
            onClick={() => setPage((prevPage) => prevPage + 1)}>
            {payload === 'loading' ? 'Загрузка...' : 'Загрузить еще'}
          </Button>
        </Row>
      )}
    </Row>
  );
};
