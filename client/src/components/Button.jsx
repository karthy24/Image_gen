import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Button = styled.div`
  border-radius: 10px;
  color: white;
  font-size: 16px; /* Increased for better visibility */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  height: 48px; /* Fixed height for consistency */

  ${({ type, theme }) =>
    type === "secondary"
      ? `background: ${theme.secondary};`
      : `background: ${theme.primary};`}

  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.4;
    cursor: not-allowed;
  `}

  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
    cursor: not-allowed;
  `}

  ${({ flex }) =>
    flex &&
    `
    flex: 1;
  `}
  
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px 18px;
    height: 42px;
  }
`;


const button = ({ text,  isLoading,  isDisabled,  rightIcon,  leftIcon,type,onClick,flex, }) => {
  return (
    <Button
      onClick={() => !isDisabled && !isLoading && onClick()}
      isDisabled={isDisabled}
      type={type}
      isLoading={isLoading}
      flex={flex}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </Button>
  );
};

export default button;