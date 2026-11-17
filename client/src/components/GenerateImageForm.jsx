import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary || '#a0a0a0'};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary || '#a0a0a0'};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary || '#a0a0a0'};
`;

const TextInput = styled.input`
  width: 100%;
  border-radius: 8px;
  padding: 14px 16px;
  background: transparent;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  border: 1px solid ${({ theme }) => theme.border || '#333333'};
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #0070f3;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 8px;
  padding: 14px 16px;
  background: transparent;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  border: 1px solid ${({ theme }) => theme.border || '#333333'};
  outline: none;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #0070f3;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

const Button = styled.button`
  flex: 1;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 14px 18px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: all 0.2s ease;

  background: ${({ type }) =>
    type === 'generate' ? '#0070f3' : '#7928ca'};

  &:hover {
    filter: brightness(1.1);
  }
`;

const InfoText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary || '#888888'};
  margin-top: -8px;
`;

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setGenerateImageLoading,
  setCreatePostLoading,
  generateImageLoading,
}) => {
  const navigate = useNavigate();

  // 1. Generate Image Handler
  const generateImageFun = async () => {
    if (!post.prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setGenerateImageLoading(true);
    try {
      const response = await fetch("https://image-gen-wcfq.onrender.com/api/generateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: post.prompt }),
      });

      const data = await response.json();

      if (response.ok && data.photo) {
        setPost((prev) => ({
          ...prev,
          photo: data.photo.startsWith("data:")
            ? data.photo
            : `data:image/jpeg;base64,${data.photo}`,
        }));
      } else {
        alert(data.message || "Failed to generate image");
      }
    } catch (error) {
      console.error("Generate error:", error);
      alert("Error generating image. Check your server!");
    } finally {
      setGenerateImageLoading(false);
    }
  };

  // 2. Post Image Handler (Redirects to Home after posting)
  const createPostFun = async () => {
    if (!post.name || !post.prompt || !post.photo) {
      alert("Please enter author name, prompt, and generate an image first!");
      return;
    }

    setCreatePostLoading(true);
    try {
      const response = await fetch("https://image-gen-wcfq.onrender.com/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: post.name,
          prompt: post.prompt,
          photo: post.photo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to Home page so the new image is visible!
        navigate("/");
      } else {
        alert(data.message || "Failed to post image");
      }
    } catch (error) {
      console.error("Post error:", error);
      alert("Error posting image. Check your server!");
    } finally {
      setCreatePostLoading(false);
    }
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>Write your prompt according to the image you want to generate!</Desc>
      </Top>

      <Body>
        <InputWrapper>
          <Label>Author</Label>
          <TextInput
            placeholder="Enter your name"
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Image Prompt</Label>
          <TextArea
            placeholder="Write a prompt for the image..."
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          />
        </InputWrapper>

        <InfoText>** You can post the AI Generated Image to the Community **</InfoText>

        <Actions>
          <Button
            type="generate"
            disabled={generateImageLoading || !post.prompt}
            onClick={generateImageFun}
          >
            {generateImageLoading ? "Generating..." : "✨ Generate Image"}
          </Button>

          <Button
            type="post"
            disabled={createPostLoading || !post.photo || !post.name}
            onClick={createPostFun}
          >
            {createPostLoading ? "Posting..." : "✏️ Post Image"}
          </Button>
        </Actions>
      </Body>
    </Form>
  );
};

export default GenerateImageForm;
