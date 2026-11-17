import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  flex-direction: column;
  display: flex;
  gap: 20px;
  align-items: center;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const HeadLine = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: #FFFFFFFF;
  align-items: center;
  flex-direction: column;
  display: flex;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: #5021faff;

  @media (max-width: 600px) {
    font-size: 20px;  
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1140px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const EmptyMessage = styled.div`
  color: #888;
  font-size: 18px;
  margin-top: 40px;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch posts from your backend MongoDB database
  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://image-gen-wcfq.onrender.com/api/generateImage");
      const data = await res.json();
      if (data?.data) {
        // Reverse so the newly posted image is shown first
        setPosts(data.data.reverse());
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Filter posts based on search input
  const filteredPosts = posts.filter(
    (item) =>
      item?.prompt?.toLowerCase().includes(search.toLowerCase()) ||
      item?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <HeadLine>
        Explore popular posts in Community!
        <Span> Generated with AI</Span>
      </HeadLine>
      <SearchBar search={search} setSearch={setSearch} />
      <Wrapper>
        {loading ? (
          <EmptyMessage>Loading posts...</EmptyMessage>
        ) : filteredPosts.length > 0 ? (
          <CardWrapper>
            {filteredPosts.map((item, index) => (
              <ImageCard key={item._id || index} item={item} />
            ))}
          </CardWrapper>
        ) : (
          <EmptyMessage>No posts found. Generate one!</EmptyMessage>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;