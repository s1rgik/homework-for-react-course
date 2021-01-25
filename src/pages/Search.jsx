import React from 'react';
import Axios from 'axios';

import { PostsList } from '../components/PostsList';

import { Button, Row } from 'react-bootstrap';

const limit = 9;

export const Search = ({ history, apiUrl }) => {
  const searchStr = new URLSearchParams(history.location.search).get('q').trim();

  const [payload, setPayload] = React.useState();
  const [posts, setPosts] = React.useState([]);
  const page = React.useRef(1);

  const fetchPosts = async () => {
    try {
      setPayload('loading');

      const { data } = await Axios.get(
        `${apiUrl}/posts?title=${searchStr}&limit=${limit}&page=${page.current}`,
      );

      setPosts((prevPosts) => [...prevPosts, ...data]);

      if (data.length < limit) {
        setPayload('max');
      } else {
        setPayload('loaded');
      }
    } catch (error) {
      alert('Ошибка при получении статей');
    }
  };

  React.useEffect(() => {
    setPosts([]);
    page.current = 1;
    if (searchStr) fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);

  const nextPage = () => {
    if (payload !== 'max') {
      ++page.current;
      fetchPosts();
    }
  };

  const _showButton = () => {
    if (posts.length && (payload === 'loading' || payload === 'loaded')) return true;
    return false;
  };

  const _notFound = () => {
    if (searchStr && !posts.length && (payload === 'loaded' || payload === 'max')) return true;
    return false;
  };

  return (
    <Row className="d-block m-0 text-left">
      <h2 className="m-0">Результаты поиска по запросу "{searchStr}":</h2>
      {!searchStr && <p className="mt-4 mb-0">Ошибка. Передан пустой запрос</p>}

      {payload === 'loading' && <p className="mt-4 mb-4">Загрузка...</p>}

      {_notFound() && <p className="mt-4 mb-4">Ничего не найдено</p>}

      {posts.length > 0 && <PostsList posts={posts} />}

      {_showButton() && (
        <Row className="justify-content-md-center">
          <Button variant="primary" disabled={payload === 'loading'} onClick={nextPage}>
            {payload === 'loading' ? 'Загрузка...' : 'Загрузить еще'}
          </Button>
        </Row>
      )}
    </Row>
  );
};
