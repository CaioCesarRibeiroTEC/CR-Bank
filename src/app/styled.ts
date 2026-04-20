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

export const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const LogoTitle = styled.h1`
  font-size: 32px;
  color: #1e3a8a;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-top: 6px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: #2563eb; }
`;

export const SubmitButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;
  &:hover { background-color: #1d4ed8; }
`;

export const StyledLink = styled(Link)`
  color: #2563eb;
  text-decoration: none;
  font-weight: bold;
  &:hover { text-decoration: underline; }
`;