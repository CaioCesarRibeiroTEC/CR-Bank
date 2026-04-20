import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ContainerDeposito = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const Title = styled.h2`
  margin-top: 0;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Description = styled.p`
  color: #6b7280;
  margin-bottom: 25px;
  line-height: 1.5;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-top: 8px;
  margin-bottom: 20px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus { 
    border-color: #10b981; /* Verde focado */
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

export const DepositBtn = styled.button`
  width: 100%;
  background-color: #10b981; /* Verde botão */
  color: white;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  
  &:hover { 
    background-color: #059669; 
  }
  
  &:active {
    transform: scale(0.98);
  }
`;