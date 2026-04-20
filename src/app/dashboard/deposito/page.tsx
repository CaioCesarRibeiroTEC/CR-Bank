'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContainerDeposito, Title, Description, Input, DepositBtn } from './styled';

export default function DepositoPage() {
  const [usuario, setUsuario] = useState<any>(null);
  const [valorDeposito, setValorDeposito] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const router = useRouter();

  // Busca o usuário logado para saber em qual conta depositar
  useEffect(() => {
    const dados = localStorage.getItem('crbank_usuario');
    if (!dados) {
      router.push('/');
      return;
    }
    setUsuario(JSON.parse(dados));
  }, [router]);

  const handleDepositar = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Processando depósito...');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    try {
      const resposta = await fetch(`${API_URL}/transacoes/deposito`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conta_destino_id: usuario.accounts[0].id,
          valor: Number(valorDeposito)
        }),
      });

      if (resposta.ok) {
        const dadosRetorno = await resposta.json();
        setStatusMsg('✅ Depósito realizado com sucesso!');
        
        // Atualiza a "foto" do saldo no navegador
        const usuarioLocal = JSON.parse(localStorage.getItem('crbank_usuario') || '{}');
        if (usuarioLocal.accounts && usuarioLocal.accounts.length > 0) {
          usuarioLocal.accounts[0].saldo = dadosRetorno.novo_saldo;
          localStorage.setItem('crbank_usuario', JSON.stringify(usuarioLocal));
        }

        setTimeout(() => window.location.reload(), 1500);
      } else {
        const erro = await resposta.json();
        setStatusMsg(`❌ Erro: ${erro.erro}`);
      }
    } catch (error) {
      setStatusMsg('❌ Erro de conexão com o servidor.');
    }
  };

  if (!usuario) return null;

  return (
    <ContainerDeposito>
      <Title><span style={{ fontSize: '28px' }}>📥</span> Depositar Dinheiro</Title>
      
      <Description>
        Simule um aporte financeiro na sua conta. O valor entrará imediatamente no seu saldo disponível para você começar a usar.
      </Description>
      
      <form onSubmit={handleDepositar}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
          Valor a depositar (R$)
        </label>
        <Input 
          type="number" 
          required 
          min="1" 
          step="0.01" 
          value={valorDeposito} 
          onChange={(e) => setValorDeposito(e.target.value)} 
          placeholder="Ex: 150.00" 
        />
        
        {statusMsg && (
          <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '15px', color: statusMsg.includes('Erro') ? '#dc2626' : '#16a34a' }}>
            {statusMsg}
          </p>
        )}
        
        <DepositBtn type="submit">Gerar Depósito</DepositBtn>
      </form>
    </ContainerDeposito>
  );
}