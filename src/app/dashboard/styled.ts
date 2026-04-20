import styled, { keyframes } from 'styled-components';

export const Container = styled.main`
  min-height: 100vh;
  background-color: #f3f4f6;
  padding-bottom: 50px;
`;

export const Header = styled.header`
  background-color: #1e3a8a;
  color: white;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: #bfdbfe;
  font-size: 14px;
`;

export const LogoutBtn = styled.button`
  background-color: #1e40af;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover { background-color: #1d4ed8; }
`;

export const Content = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 0 20px;
`;

export const CardSaldo = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const Valor = styled.h2`
  font-size: 40px;
  margin: 10px 0;
  color: #111827;
`;

export const GridBotoes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
`;

/* O $ativo muda o visual se o botão estiver selecionado */
export const ActionButton = styled.button<{ $ativo?: boolean }>`
  background: ${props => props.$ativo ? '#eff6ff' : 'white'};
  border: 1px solid ${props => props.$ativo ? '#2563eb' : '#e5e7eb'};
  padding: 20px;
  border-radius: 12px;
  font-size: 16px;
  color: #2563eb;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
  box-shadow: ${props => props.$ativo ? '0 4px 6px rgba(37,99,235,0.1)' : 'none'};
  &:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
`;

export const PainelDinamico = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  margin-top: 30px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const SubMenuPix = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 20px;
`;

export const SubMenuBtn = styled.button<{ $ativo?: boolean }>`
  background: ${props => props.$ativo ? '#2563eb' : '#f3f4f6'};
  color: ${props => props.$ativo ? 'white' : '#4b5563'};
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
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

/* --- ESTILOS DO CHAT DE SUPORTE --- */
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
`;

export const MensagensBox = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MensagemBalao = styled.div<{ $isMinha: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 16px;
  align-self: ${props => props.$isMinha ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.$isMinha ? '#2563eb' : '#e5e7eb'};
  color: ${props => props.$isMinha ? 'white' : '#111827'};
  border-bottom-right-radius: ${props => props.$isMinha ? '4px' : '16px'};
  border-bottom-left-radius: ${props => !props.$isMinha ? '4px' : '16px'};
`;

export const ChatInputArea = styled.form`
  display: flex;
  padding: 15px;
  background: white;
  border-top: 1px solid #e5e7eb;
  gap: 10px;
`;

/* --- ESTILOS DO MODAL DE BOAS-VINDAS PREMIUM --- */
export const popIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

export const WelcomeOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const WelcomeModal = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
  padding: 40px;
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: ${popIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  border: 2px solid #22c55e;
`;

export const WelcomeTitle = styled.h2`
  font-size: 36px;
  color: #166534;
  margin-bottom: 15px;
  margin-top: 0;
`;

export const WelcomeText = styled.p`
  font-size: 18px;
  color: #374151;
  margin-bottom: 35px;
  line-height: 1.6;
`;

export const ContinueButton = styled.button`
  background-color: #16a34a;
  color: white;
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 16px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.4);
  
  &:hover {
    background-color: #15803d;
    transform: translateY(-2px);
    box-shadow: 0 15px 20px -3px rgba(22, 163, 74, 0.5);
  }
`;

/* Mantidos para retrocompatibilidade no seu código, caso decida voltar atrás */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;






/*  ESTILOS: ÁREA PIX  */

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
  
  /* Esconde a barra de rolagem mas mantém a funcionalidade */
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
  
  &:hover {
    transform: translateY(-2px);
  }
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

  ${PixCircleBtn}:hover & {
    background-color: #e5e7eb;
  }
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

  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
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

  &:hover {
    color: #111827;
  }
`;

export const SearchBar = styled.div`
  background: white;
  padding: 15px 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  color: #374151;
  &::placeholder { color: #9ca3af; }
`;

export const NotificationOverlay = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  animation: fadeIn 0.3s ease-in-out;
`;

export const NotificationBox = styled.div`
  background: white;
  border-left: 6px solid #10b981;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

export const NotificationBtn = styled.button`
  background-color: #10b981;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  &:hover { background-color: #059669; }
`;

export const AvatarPequeno = styled.img`
  width: 40px; height: 40px; border-radius: 50%; object-fit: cover;
`;
export const HeaderInfo = styled.div`
  display: flex; align-items: center; gap: 15px;
`;

export const Footer = styled.footer`
  background-color: #111827;
  color: #f3f4f6;
  padding: 50px 0 30px 0;
  margin-top: 60px;
`;

export const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterTitle = styled.h4`
  color: white;
  font-size: 16px;
  margin-bottom: 10px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 30px;
    height: 2px;
    background-color: #2563eb;
  }
`;

export const FooterLink = styled.a`
  color: #9ca3af;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

export const SocialGrid = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

export const SocialIcon = styled.a`
  width: 40px; 
  height: 40px;
  background-color: #374151;
  border-radius: 10px; 
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  

  color: #d1d5db; 
  font-size: 20px; 
  
  transition: all 0.2s;

  &:hover {
    background-color: #2563eb;
    color: white; 
    transform: translateY(-3px);
  }


  svg {
    display: block;
  }
`;

export const Copyright = styled.div`
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #374151;
  color: #6b7280;
  font-size: 12px;
`;