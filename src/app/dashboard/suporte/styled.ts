import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ContainerSuporte = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
`;

export const MensagensBox = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const MensagemBalao = styled.div<{ $isMinha: boolean, $isBot?: boolean }>`
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 16px;
  align-self: ${props => props.$isMinha ? 'flex-end' : 'flex-start'};
  
  /* Se for minha, é Azul. Se for do Bot, é Branco com borda. */
  background-color: ${props => props.$isMinha ? '#2563eb' : 'white'};
  color: ${props => props.$isMinha ? 'white' : '#111827'};
  border: ${props => (!props.$isMinha && props.$isBot) ? '1px solid #e5e7eb' : 'none'};
  box-shadow: ${props => (!props.$isMinha && props.$isBot) ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'};
  
  border-bottom-right-radius: ${props => props.$isMinha ? '4px' : '16px'};
  border-bottom-left-radius: ${props => !props.$isMinha ? '4px' : '16px'};
  line-height: 1.4;
`;

export const MenuRapido = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
  background: white;
  border-top: 1px solid #e5e7eb;
`;

export const BotaoMenu = styled.button`
  background: white;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
    background-color: #eff6ff;
  }
`;

export const ChatInputArea = styled.form`
  display: flex;
  padding: 15px;
  background: white;
  border-top: 1px solid #e5e7eb;
  gap: 10px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  &:focus { border-color: #2563eb; }
`;