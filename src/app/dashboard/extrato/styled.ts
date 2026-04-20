import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ContainerExtrato = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const TransacaoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s;

  &:last-child { border-bottom: none; }
  &:hover { background-color: #f9fafb; }
`;

export const TransacaoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const IconeBox = styled.div<{ $isSaida: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: ${props => props.$isSaida ? '#fee2e2' : '#d1fae5'};
  color: ${props => props.$isSaida ? '#dc2626' : '#16a34a'};
`;

export const DetalhesTexto = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TipoTexto = styled.span`
  font-weight: bold;
  color: #111827;
  text-transform: capitalize;
`;

export const DataTexto = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const ValorTexto = styled.span<{ $isSaida: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.$isSaida ? '#dc2626' : '#16a34a'};
`;





export const InfoPessoa = styled.span`
  font-size: 13px;
  color: #4b5563;
  display: block;
  margin-top: 4px;
`;

export const ReceiptBtn = styled.button`
  background: none;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }
`;

/* ESTILOS DO MODAL DE COMPROVANTE */
export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
  animation: ${fadeIn} 0.2s ease-in-out;
`;

export const ReceiptBox = styled.div`
  background: white;
  width: 100%;
  max-width: 450px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
`;

export const ReceiptHeader = styled.div`
  background-color: #1e3a8a;
  color: white;
  padding: 20px;
  text-align: center;
  position: relative;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.8;
  &:hover { opacity: 1; }
`;

export const ReceiptBody = styled.div`
  padding: 30px;
`;

export const ReceiptRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-bottom: 1px dashed #e5e7eb;
  padding-bottom: 15px;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const Label = styled.span`
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const DataText = styled.span`
  font-size: 15px;
  color: #111827;
  font-weight: 500;
`;