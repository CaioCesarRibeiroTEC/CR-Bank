import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); }`;

export const ContainerPerfil = styled.div`
  background: white; padding: 30px; border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); animation: ${fadeIn} 0.3s ease-in-out;
`;

export const AvatarWrapper = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 15px; margin-bottom: 30px;
`;

export const AvatarPreview = styled.img`
  width: 120px; height: 120px; border-radius: 50%; object-fit: cover;
  border: 4px solid #f3f4f6; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

export const AvatarPlaceholder = styled.div`
  width: 120px; height: 120px; border-radius: 50%; background-color: #e5e7eb;
  display: flex; justify-content: center; align-items: center; font-size: 40px;
  border: 4px solid #f3f4f6; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

export const FileInputLabel = styled.label`
  background-color: #f3f4f6; color: #374151; padding: 8px 16px; border-radius: 20px;
  font-size: 13px; font-weight: bold; cursor: pointer; transition: all 0.2s;
  &:hover { background-color: #e5e7eb; }
  input { display: none; }
`;