'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { 
  ContainerSuporte, ChatContainer, MensagensBox, MensagemBalao, 
  MenuRapido, BotaoMenu, ChatInputArea, Input 
} from './styled';

export default function SuportePage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [msgAtual, setMsgAtual] = useState('');
  const fimChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const novaConexao = io('http://localhost:3333');
    setSocket(novaConexao);

    // Boas-vindas do Bot assim que abrir a tela
    setMensagens([{
      autor_id: 'bot_crbank',
      texto: '🤖 Olá! Sou o assistente virtual do CR Bank. Escolha uma das opções abaixo ou digite sua dúvida!'
    }]);

    novaConexao.on('nova_mensagem', (novaMsg) => {
      setMensagens((prev) => [...prev, novaMsg]);
    });

    return () => { novaConexao.disconnect(); };
  }, []);

  // Rola para o final automático
  useEffect(() => {
    fimChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  // Função para enviar texto digitado
  const handleEnviarMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (msgAtual.trim() && socket) {
      socket.emit('enviar_mensagem', { texto: msgAtual });
      setMsgAtual('');
    }
  };

  // Função para quando o usuário clica num botão do Menu Rápido
  const handleCliqueBotao = (textoDoBotao: string) => {
    if (socket) {
      socket.emit('enviar_mensagem', { texto: textoDoBotao });
    }
  };

  return (
    <ContainerSuporte>
      <h2 style={{ marginTop: 0, color: '#111827' }}>Central de Ajuda</h2>
      <p style={{ color: '#6b7280' }}>Tire suas dúvidas com o nosso assistente virtual.</p>

      <ChatContainer>
        <MensagensBox>
          {mensagens.map((msg, index) => {
            const isMinha = msg.autor_id === socket?.id;
            const isBot = msg.autor_id === 'bot_crbank';

            return (
              <MensagemBalao key={index} $isMinha={isMinha} $isBot={isBot}>
                <div style={{ fontSize: '10px', opacity: 0.6, marginBottom: '4px', fontWeight: 'bold' }}>
                  {isMinha ? 'Você' : 'Assistente CR Bank'}
                </div>
                {msg.texto}
              </MensagemBalao>
            );
          })}
          <div ref={fimChatRef} />
        </MensagensBox>

        {/* O MENU DE ESCOLHAS RÁPIDAS (As mensagens pré-gravadas) */}
        <MenuRapido>
          <BotaoMenu onClick={() => handleCliqueBotao('Dúvidas sobre Pix 💸')}>
            Dúvidas sobre Pix 💸
          </BotaoMenu>
          <BotaoMenu onClick={() => handleCliqueBotao('Como fazer um Depósito? 📥')}>
            Como fazer um Depósito? 📥
          </BotaoMenu>
          <BotaoMenu onClick={() => handleCliqueBotao('Problemas com Cartão 💳')}>
            Problemas com Cartão 💳
          </BotaoMenu>
          <BotaoMenu onClick={() => handleCliqueBotao('Falar com um Atendente 👤')}>
            Falar com um Atendente 👤
          </BotaoMenu>
        </MenuRapido>
        
        <ChatInputArea onSubmit={handleEnviarMsg}>
          <Input 
            placeholder="Ou digite sua mensagem aqui..." 
            value={msgAtual} 
            onChange={(e) => setMsgAtual(e.target.value)} 
          />
          <button type="submit" style={{ background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', padding: '0 20px', fontWeight: 'bold', cursor: 'pointer' }}>
            Enviar
          </button>
        </ChatInputArea>
      </ChatContainer>
    </ContainerSuporte>
  );
}