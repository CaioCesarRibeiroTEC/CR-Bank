'use client';

import { useEffect, useState } from 'react';
import { 
  PainelDinamico, WelcomeOverlay, WelcomeModal, WelcomeTitle, 
  WelcomeText, ContinueButton 
} from './styled';

export default function DashboardHome() {
  const [exibirBoasVindas, setExibirBoasVindas] = useState(false);

  useEffect(() => {
    const primeiraVez = localStorage.getItem('show_welcome');
    if (primeiraVez === 'true') {
      setExibirBoasVindas(true);
      localStorage.removeItem('show_welcome');
    }
  }, []);

  return (
    <>
      <PainelDinamico>
        <h2 style={{ marginTop: 0 }}>Início</h2>
        <p style={{ color: '#6b7280' }}>
          Selecione uma das opções acima para gerenciar sua conta, realizar pagamentos ou entrar em contato com nosso suporte.
        </p>
        
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db', textAlign: 'center' }}>
          <span style={{ fontSize: '30px' }}>📈</span>
          <p style={{ color: '#4b5563', fontWeight: 'bold' }}>Seu resumo de gastos aparecerá aqui em breve.</p>
        </div>
      </PainelDinamico>

      {/* Modal de Boas-Vindas com incentivo a novas contas */}
      {exibirBoasVindas && (
        <WelcomeOverlay onClick={(e) => e.target === e.currentTarget && setExibirBoasVindas(false)}>
          <WelcomeModal>
            <div style={{ fontSize: '70px', marginBottom: '10px' }}>🎉</div>
            <WelcomeTitle>Parabéns!</WelcomeTitle>
            <WelcomeText>
              Sua conta no <strong>CR Bank</strong> está ativa. <br /><br />
              Como presente, creditamos <span style={{ color: '#16a34a', fontWeight: '900', fontSize: '24px' }}>R$ 500,00</span> na sua conta agora mesmo!
              <br /><br />
              💡 <strong>Dica de mestre:</strong> Para ver a mágica acontecer, abra outras contas em abas diferentes! Nossas funcionalidades de <strong>Pix, Transferência e Extrato</strong> só brilham de verdade quando você tem vários perfis para testar as interações em tempo real.
            </WelcomeText>
            <ContinueButton onClick={() => setExibirBoasVindas(false)}>
              Começar a explorar
            </ContinueButton>
          </WelcomeModal>
        </WelcomeOverlay>
      )}
    </>
  );
}