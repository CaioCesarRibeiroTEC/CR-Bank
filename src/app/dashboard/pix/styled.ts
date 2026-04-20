import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ContainerPix = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const PixSection = styled.div`
  margin-bottom: 30px;
`;

export const PixTitle = styled.h3`
  font-size: 18px;
  color: #111827;
  margin-bottom: 15px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 10px;
`;

export const PixGridButtons = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const PixCircleBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  width: 80px;
  transition: transform 0.2s;
  
  &:hover { transform: translateY(-2px); }
`;

export const PixIcon = styled.div`
  width: 64px;
  height: 64px;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #111827;
  transition: background-color 0.2s;

  ${PixCircleBtn}:hover & { background-color: #e5e7eb; }
`;

export const PixLabel = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: #374151;
  text-align: center;
  line-height: 1.2;
`;

export const PixListBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  background: white;
  border: none;
  border-bottom: 1px solid #f3f4f6;
  padding: 20px 0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover { background-color: #f9fafb; }
  &:last-child { border-bottom: none; }
`;

export const VoltarBtn = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  padding: 0;
  &:hover { color: #111827; }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: #2563eb; }
`;

export const TransferBtn = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;
  &:hover { background-color: #1d4ed8; }
`;