import React, { useState } from 'react';
import styled from 'styled-components';
import GenerateImageForm from '../components/GenerateImageForm';
import GeneratedImageCard from '../components/GeneratedImageCard';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  flex-direction: column;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1200px;
  gap: 8%;
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 500px;
`;

const DownloadButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #059669;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const handleDownload = () => {
    if (!post.photo) return;
    const link = document.createElement("a");
    link.href = post.photo;
    link.download = `${post.prompt ? post.prompt.slice(0, 20).replace(/\s+/g, '_') : 'ai-image'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Wrapper>
        <GenerateImageForm 
          post={post} 
          setPost={setPost} 
          createPostLoading={createPostLoading} 
          setGenerateImageLoading={setGenerateImageLoading}
          setCreatePostLoading={setCreatePostLoading}
          generateImageLoading={generateImageLoading} 
        />

        <RightSection>
          <GeneratedImageCard src={post.photo} loading={generateImageLoading} />
          
          {post.photo && (
            <DownloadButton onClick={handleDownload}>
              📥 Download Image
            </DownloadButton>
          )}
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default CreatePost;