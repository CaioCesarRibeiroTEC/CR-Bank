'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { io } from 'socket.io-client'; 

// 👇 Imports dos ícones profissionais (react-icons)
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';

import { 
  Container, Header, Title, Subtitle, LogoutBtn, Content, 
  CardSaldo, Valor, GridBotoes, ActionButton, SearchBar, SearchInput,
  NotificationOverlay, NotificationBox, NotificationBtn,
  HeaderInfo, Footer, FooterContent, FooterColumn, FooterTitle, FooterLink, SocialGrid, SocialIcon, Copyright
} from './styled';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<any>(null);
  const [notificacao, setNotificacao] = useState<{titulo: string, mensagem: string} | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Função para atualizar o saldo silenciosamente (sem recarregar a tela)
  const buscarSaldoReal = async (userLocal: any) => {
    try {
      const resposta = await fetch(`http://localhost:3333/contas/${userLocal.accounts[0].numero_conta}/extrato`);
      if (resposta.ok) {
        const dadosServer = await resposta.json();
        const usuarioAtualizado = { ...userLocal };
        usuarioAtualizado.accounts[0].saldo = dadosServer.saldo_atual;
        
        setUsuario(usuarioAtualizado);
        localStorage.setItem('crbank_usuario', JSON.stringify(usuarioAtualizado));
      }
    } catch (error) { console.error("Erro ao sincronizar.", error); }
  };

  useEffect(() => {
    const dados = localStorage.getItem('crbank_usuario');
    if (!dados) { router.push('/'); return; }
    
    const userLocal = JSON.parse(dados);
    setUsuario(userLocal);
    buscarSaldoReal(userLocal);

    // ============================================
    // CONEXÃO DE NOTIFICAÇÕES (TEMPO REAL)
    // ============================================
    const socket = io('http://localhost:3333');
    const contaId = userLocal.accounts[0].id;

    // Conecta e registra a conta para ouvir os próprios eventos
    socket.emit('registrar_conta', contaId);

    // Ficar ouvindo e aguardando a notificação
    socket.on('notificacao_pix', (dadosDaTransacao) => {
      setNotificacao({
        titulo: dadosDaTransacao.titulo,
        mensagem: dadosDaTransacao.mensagem
      });
    });

    return () => { socket.disconnect(); };
  }, [router, pathname]); 

  const handleFecharNotificacao = () => {
    setNotificacao(null);
    buscarSaldoReal(usuario);
  };

  const handleSair = () => {
    localStorage.removeItem('crbank_token');
    localStorage.removeItem('crbank_usuario');
    router.push('/');
  };

  if (!usuario) return null;
  const conta = usuario.accounts[0];

  return (
    <Container>
      <Header>
        <HeaderInfo>
          {usuario.avatar ? (
             <img src={usuario.avatar} alt="Perfil" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
             <div style={{ fontSize: '30px' }}>👤</div>
          )}
          <div>
            <Title>CR Bank</Title>
            <Subtitle>Olá, {usuario.nome}</Subtitle>
          </div>
        </HeaderInfo>
        <LogoutBtn onClick={handleSair}>Sair</LogoutBtn>
      </Header>

      <Content>

        <CardSaldo>
          <div>
            <p style={{ color: '#6b7280', margin: 0 }}>Saldo disponível</p>
            <Valor>R$ {Number(conta.saldo).toFixed(2).replace('.', ',')}</Valor>
            <p style={{ color: '#9ca3af', margin: 0, fontSize: '14px' }}>Agência {conta.agencia} | Conta {conta.numero_conta}</p>
          </div>
          <div style={{ fontSize: '40px' }}>💰</div>
        </CardSaldo>

        <GridBotoes>
          <ActionButton $ativo={pathname === '/dashboard/pix'} onClick={() => router.push('/dashboard/pix')}><span>💸</span> Área Pix</ActionButton>
          <ActionButton $ativo={pathname === '/dashboard/deposito'} onClick={() => router.push('/dashboard/deposito')}><span>📥</span> Depositar</ActionButton>
          <ActionButton $ativo={pathname === '/dashboard/extrato'} onClick={() => router.push('/dashboard/extrato')}><span>📄</span> Extrato</ActionButton>
          <ActionButton $ativo={pathname === '/dashboard/perfil'} onClick={() => router.push('/dashboard/perfil')}><span>⚙️</span> Perfil</ActionButton>
          <ActionButton $ativo={pathname === '/dashboard/cartao'} onClick={() => router.push('/dashboard/cartao')}><span>💳</span> Cartão </ActionButton>
          
          <ActionButton $ativo={pathname === '/dashboard/suporte'} onClick={() => router.push('/dashboard/suporte')}><span>💬</span> Suporte</ActionButton>
        </GridBotoes>

        <div style={{ marginTop: '30px' }}>{children}</div>
      </Content>

      {/* FOOTER */}
      <Footer>
        <FooterContent>
          <FooterColumn>
            <FooterTitle>CR Bank</FooterTitle>
            <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>
              O seu banco digital de confiança, focado em tecnologia, 
              segurança e a melhor experiência de usuário do mercado.
            </p>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Acesso Rápido</FooterTitle>
            <FooterLink onClick={() => router.push('/dashboard')}>Início</FooterLink>
            <FooterLink onClick={() => router.push('/dashboard/pix')}>Área Pix</FooterLink>
            <FooterLink onClick={() => router.push('/dashboard/cartao')}>Meu Cartão</FooterLink>
            <FooterLink onClick={() => router.push('/dashboard/perfil')}>Configurações</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Desenvolvedor</FooterTitle>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
              <strong>CRdeveloper</strong><br />
              Full Stack Developer
            </p>
            
            {/* GRID DE ÍCONES SOCIAIS */}
            <SocialGrid>
              <SocialIcon href="https://github.com/CaioCesarRibeiroTEC" target="_blank" title="GitHub">
                <AiFillGithub />
              </SocialIcon>
              
              <SocialIcon href="https://www.linkedin.com/in/caio-c%C3%A9sar-ribeiro-b07b46325/" target="_blank" title="LinkedIn">
                <AiFillLinkedin />
              </SocialIcon>
              
              <SocialIcon href="https://www.instagram.com/cr.developer.dev/" target="_blank" title="Instagram">
                <AiFillInstagram />
              </SocialIcon>
              
              <SocialIcon href="https://wa.me/62981904367" target="_blank" title="WhatsApp">
                <FaWhatsapp />
              </SocialIcon>
            </SocialGrid>

          </FooterColumn>
        </FooterContent>

        <Copyright>
          © 2026 CR Bank. Desenvolvido por CRdeveloper. Todos os direitos reservados.
        </Copyright>
      </Footer>

      {notificacao && (
        <NotificationOverlay>
          <NotificationBox>
            <h3 style={{ margin: 0, color: '#111827' }}>{notificacao.titulo}</h3>
            <p style={{ margin: 0, color: '#4b5563', fontSize: '14px' }}>{notificacao.mensagem}</p>
            <NotificationBtn onClick={handleFecharNotificacao}>Atualizar Saldo</NotificationBtn>
          </NotificationBox>
        </NotificationOverlay>
      )}

    </Container>
  );
}