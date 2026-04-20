import styled from 'styled-components';
import Link from 'next/link';

export const Container = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  padding: 20px;
`;

export const CadastroBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 28px;
  color: #111827;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 30px;
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  
  /* O botão e e-mail vão ocupar a linha toda */
  .full-width { grid-column: span 2; }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    .full-width { grid-column: span 1; }
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #2563eb; }
`;

export const SubmitButton = styled.button`
  background-color: #10b981; /* Verde para remeter a dinheiro/sucesso */
  color: white;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;
  &:hover { background-color: #059669; }
`;

export const StyledLink = styled(Link)`
  color: #2563eb;
  text-decoration: none;
  font-weight: bold;
`;