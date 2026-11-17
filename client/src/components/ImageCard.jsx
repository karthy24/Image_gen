import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Avatar from '@mui/material/Avatar';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import  FileSaver  from 'file-saver';


const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 12px;
  box-shadow: 1px 2px 40px 8px rgba(32, 31, 31, 1);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden; /* Important to clip overflow from image/overlay */
  &:hover {
    box-shadow: 1px 2px 40px 8px rgba(32, 31, 31, 0.5);
    scale: 1.02;
  }

  &:nth-child(7n + 1) {
    grid-column: auto / span 2;
    grid-row: auto / span 2;
  }
`;

const StyledImage = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const HoverOverLay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  transition: opacity 0.3s ease;
  border-radius: 12px;
  justify-content: end;
  padding: 12px;
  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 400;
  color: #FFFFFF;
  font-size: 15px;

`;

const Author = styled.div`
  font-weight: 600;
  color: #FFFFFF;
  font-size: 15px;
  display: flex;
  align-items:center;
  gap: 8px;
`;

const ImageCard = ({ item }) => {
  return (
    <Card>
      <StyledImage alt={item?.prompt} style={{ borderRadius: "12px" }} effect="blur" width="100%" src={item?.photo} />
      <HoverOverLay>
        <Prompt>{item?.prompt}</Prompt>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Author>
            <Avatar sx={{ width: "32px", height: "32px" }}>
              {item?.author?.[0] || "A"}
            </Avatar>
            {item?.author || "Anonymous"}
          </Author>
          <DownloadRounded onClick={() => FileSaver.saveAs(item?.photo, "download.jpg")} />
        </div>
      </HoverOverLay>
    </Card>
  );
};


export default ImageCard;