import React from 'react';
import styled from 'styled-components';
import { useNavigate,useLocation } from 'react-router-dom';
import Button from './Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';

const Container = styled.div`
  height: 60px;
  width: 100%;
  flex: 1;
  color: ${({theme}) => theme.text_primary};
  font-weight: bold;
  font-size: 22px;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  box-shadow: 0px 0px 10px rgba(74, 36, 36, 0.15);
  background-color: ${({ theme }) => theme.navbar};
  @media only screen and (max-width:600px){
    padding: 10px 12px;
  }
    gap: 20px;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path= location.pathname.split("/");
  return (
    <Container>
      GenAI
      {path[1]==="Create" ? ( 
        <Button
          onClick={() => navigate("/")}
          text="Explore the post"
          leftIcon={
            <ExploreRoundedIcon 
              style={{ 
                fontSize: "18px" 
              }} 
            />
          }
           type="secondary"
        />
      ) : (
        <Button
          onClick={() => navigate("/Create")}
          text="Create new post"
          leftIcon={
            <AddRoundedIcon 
              style={{ 
                fontSize: "18px" 
              }} 
            />
          }
          type=""
        />
      )}
    </Container>
  );
};

export default Navbar;
