'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ContainerPix, PixSection, PixTitle, PixGridButtons, 
  PixCircleBtn, PixIcon, PixLabel, PixListBtn, VoltarBtn, 
  Input, TransferBtn 
} from './styled';

export default function PixPage() {
  const [usuario, setUsuario] = useState<any>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [telaAtual, setTelaAtual] = useState<'menu' | 'transferir' | 'copia_cola' | 'qr_code' | 'cobrar' | 'chaves' | 'configurar'>('menu');
  
  // Estados Gerais
  const [statusMsg, setStatusMsg] = useState('');
  
  // Estados Transferência e Copia e Cola
  const [chaveDestino, setChaveDestino] = useState('');
  const [valorPix, setValorPix] = useState('');
  const [codigoCola, setCodigoCola] = useState('');

  // Estados Chaves
  const [minhasChaves, setMinhasChaves] = useState<any[]>([]);
  const [novaChave, setNovaChave] = useState('');
  const [tipoChave, setTipoChave] = useState('EMAIL');

  // Estados Cobrança
  const [valorCobranca, setValorCobranca] = useState('');
  const [chaveCobranca, setChaveCobranca] = useState('');
  const [codigoGerado, setCodigoGerado] = useState('');

  // Carrega Usuário e Chaves
  useEffect(() => {
    const dados = localStorage.getItem('crbank_usuario');
    if (!dados) { router.push('/'); return; }
    
    const user = JSON.parse(dados);
    setUsuario(user);
    buscarMinhasChaves(user.accounts[0].id);
  }, [router]);

  const buscarMinhasChaves = async (contaId: string) => {
    try {
      const res = await fetch(`${API_URL}/contas/${contaId}/chaves`);
      if (res.ok) setMinhasChaves(await res.json());
    } catch (error) { console.error(error); }
  };

  // 1. MOTOR DE TRANSFERÊNCIA (Usado pelo Transferir e pelo Copia e Cola)
  const executarPagamento = async (chave: string, valor: number) => {
    setStatusMsg('Processando...');
    try {
      const resposta = await fetch(`${API_URL}/transacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conta_origem_id: usuario.accounts[0].id,
          chave_destino: chave,
          valor: valor
        }),
      });

      if (resposta.ok) {
        const dadosRetorno = await resposta.json();
        setStatusMsg('✅ Pix realizado com sucesso!');
        
        // Atualiza a "foto" do saldo no navegador
        const usuarioLocal = JSON.parse(localStorage.getItem('crbank_usuario') || '{}');
        if (usuarioLocal.accounts && usuarioLocal.accounts.length > 0) {
          usuarioLocal.accounts[0].saldo = dadosRetorno.seu_novo_saldo;
          localStorage.setItem('crbank_usuario', JSON.stringify(usuarioLocal));
        }

        setTimeout(() => window.location.reload(), 1500);
      } else {
        const erro = await resposta.json();
        setStatusMsg(`❌ Erro: ${erro.erro}`);
      }
    } catch (error) { setStatusMsg('❌ Erro de conexão.'); }
  };

  // 2. FUNÇÕES DE INTERFACE
  const handleFazerPix = (e: React.FormEvent) => {
    e.preventDefault();
    executarPagamento(chaveDestino, Number(valorPix));
  };

  const handlePagarCopiaCola = (e: React.FormEvent) => {
    e.preventDefault();
    // O nosso código fake segue o padrão: CRBANK|chave|valor
    const partes = codigoCola.split('|');
    if (partes.length === 3 && partes[0] === 'CRBANK') {
      executarPagamento(partes[1], Number(partes[2]));
    } else {
      setStatusMsg('❌ Código Pix inválido.');
    }
  };

  const handleCadastrarChave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Registrando chave...');
    try {
      const res = await fetch(`${API_URL}/chaves`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conta_id: usuario.accounts[0].id, chave: novaChave, tipo: tipoChave }),
      });
      if (res.ok) {
        setStatusMsg('✅ Chave registrada!');
        setNovaChave('');
        buscarMinhasChaves(usuario.accounts[0].id);
      } else {
        const erro = await res.json();
        setStatusMsg(`❌ Erro: ${erro.erro}`);
      }
    } catch (error) { setStatusMsg('❌ Erro.'); }
  };

  const handleGerarCobranca = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chaveCobranca) { setStatusMsg('❌ Selecione uma chave primeiro.'); return; }
    // Gera a String do Pix Copia e Cola
    const codigo = `CRBANK|${chaveCobranca}|${valorCobranca}`;
    setCodigoGerado(codigo);
    setStatusMsg('✅ Código gerado! Copie e envie para quem vai pagar.');
  };

  const limparTelas = () => {
    setTelaAtual('menu');
    setStatusMsg('');
    setCodigoGerado('');
    setCodigoCola('');
  };

  if (!usuario) return null;

  return (
    <ContainerPix>
      {/* MENU PRINCIPAL */}
      {telaAtual === 'menu' && (
        <>
          <h2 style={{ marginTop: 0, marginBottom: '25px' }}>Área Pix</h2>
          
          <PixSection>
            <PixTitle>Enviar</PixTitle>
            <PixGridButtons>
              <PixCircleBtn onClick={() => setTelaAtual('transferir')}><PixIcon>💸</PixIcon><PixLabel>Transferir</PixLabel></PixCircleBtn>
              <PixCircleBtn onClick={() => setTelaAtual('copia_cola')}><PixIcon>📋</PixIcon><PixLabel>Pix Copia<br/>e Cola</PixLabel></PixCircleBtn>
              <PixCircleBtn onClick={() => setTelaAtual('qr_code')}><PixIcon>📷</PixIcon><PixLabel>Ler QR<br/>code</PixLabel></PixCircleBtn>
            </PixGridButtons>
          </PixSection>

          <PixSection>
            <PixTitle>Receber</PixTitle>
            <PixGridButtons>
              <PixCircleBtn onClick={() => setTelaAtual('cobrar')}><PixIcon>💰</PixIcon><PixLabel>Cobrar</PixLabel></PixCircleBtn>
              <PixCircleBtn onClick={() => router.push('/dashboard/deposito')}><PixIcon>📥</PixIcon><PixLabel>Depositar</PixLabel></PixCircleBtn>
            </PixGridButtons>
          </PixSection>

          <PixSection>
            <PixListBtn onClick={() => setTelaAtual('chaves')}>
              <div><strong style={{ display: 'block', fontSize: '15px' }}>Minhas Chaves</strong><span style={{ color: '#6b7280', fontSize: '13px' }}>Gerencie suas chaves de recebimento.</span></div><span style={{ color: '#9ca3af', fontSize: '20px' }}>›</span>
            </PixListBtn>
          </PixSection>
        </>
      )}

      {/* TELA: TRANSFERIR */}
      {telaAtual === 'transferir' && (
        <>
          <VoltarBtn onClick={limparTelas}>⬅ Voltar</VoltarBtn>
          <h2 style={{ marginTop: 0 }}>Transferir</h2>
          <form onSubmit={handleFazerPix}>
            <label>Qual é a chave Pix?</label>
            <Input required value={chaveDestino} onChange={(e) => setChaveDestino(e.target.value)} placeholder="E-mail, CPF, ou Chave Aleatória" />
            <label>Valor (R$)</label>
            <Input type="number" required min="1" step="0.01" value={valorPix} onChange={(e) => setValorPix(e.target.value)} placeholder="0.00" />
            {statusMsg && <p style={{ fontWeight: 'bold', color: statusMsg.includes('Erro') ? '#dc2626' : '#16a34a' }}>{statusMsg}</p>}
            <TransferBtn type="submit">Transferir</TransferBtn>
          </form>
        </>
      )}

      {/* TELA: PIX COPIA E COLA */}
      {telaAtual === 'copia_cola' && (
        <>
          <VoltarBtn onClick={limparTelas}>⬅ Voltar</VoltarBtn>
          <h2 style={{ marginTop: 0 }}>Pix Copia e Cola</h2>
          <p style={{ color: '#6b7280' }}>Cole o código gerado por quem está cobrando.</p>
          <form onSubmit={handlePagarCopiaCola}>
            <Input required value={codigoCola} onChange={(e) => setCodigoCola(e.target.value)} placeholder="CRBANK|..." />
            {statusMsg && <p style={{ fontWeight: 'bold', color: statusMsg.includes('Erro') ? '#dc2626' : '#16a34a' }}>{statusMsg}</p>}
            <TransferBtn type="submit">Pagar Código</TransferBtn>
          </form>
        </>
      )}

      {/* TELA: COBRAR */}
      {telaAtual === 'cobrar' && (
        <>
          <VoltarBtn onClick={limparTelas}>⬅ Voltar</VoltarBtn>
          <h2 style={{ marginTop: 0 }}>Cobrar alguém</h2>
          {minhasChaves.length === 0 ? (
            <p style={{ color: '#dc2626', fontWeight: 'bold' }}>Você precisa registrar uma chave Pix primeiro!</p>
          ) : (
            <form onSubmit={handleGerarCobranca}>
              <label>Valor a cobrar (R$)</label>
              <Input type="number" required min="1" step="0.01" value={valorCobranca} onChange={(e) => setValorCobranca(e.target.value)} />
              
              <label>Qual chave vai receber?</label>
              <select style={{ width: '100%', padding: '12px', margin: '5px 0 15px 0', borderRadius: '8px' }} value={chaveCobranca} onChange={(e) => setChaveCobranca(e.target.value)} required>
                <option value="">Selecione uma chave...</option>
                {minhasChaves.map(c => <option key={c.id} value={c.chave}>{c.tipo}: {c.chave}</option>)}
              </select>

              {statusMsg && <p style={{ fontWeight: 'bold', color: statusMsg.includes('Erro') ? '#dc2626' : '#16a34a' }}>{statusMsg}</p>}
              <TransferBtn type="submit" style={{ backgroundColor: '#10b981' }}>Gerar Código</TransferBtn>
            </form>
          )}

          {/* CÓDIGO GERADO */}
          {codigoGerado && (
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px', wordBreak: 'break-all', textAlign: 'center' }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Código Pix (Copia e Cola):</p>
              <code style={{ color: '#2563eb', fontSize: '18px' }}>{codigoGerado}</code>
            </div>
          )}
        </>
      )}

      {/* TELA: MINHAS CHAVES */}
      {telaAtual === 'chaves' && (
        <>
          <VoltarBtn onClick={limparTelas}>⬅ Voltar</VoltarBtn>
          <h2 style={{ marginTop: 0 }}>Minhas Chaves Pix</h2>
          
          <div style={{ marginBottom: '30px' }}>
            {minhasChaves.map(chave => (
              <div key={chave.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '10px' }}>
                <div><strong style={{ display: 'block' }}>{chave.tipo}</strong><span style={{ color: '#6b7280' }}>{chave.chave}</span></div>
                <span style={{ fontSize: '24px', color: '#10b981' }}>✓</span>
              </div>
            ))}
            {minhasChaves.length === 0 && <p style={{ color: '#6b7280' }}>Nenhuma chave registrada.</p>}
          </div>

          <h3 style={{ borderTop: '1px solid #f3f4f6', paddingTop: '20px' }}>Registrar nova chave</h3>
          <form onSubmit={handleCadastrarChave}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select style={{ padding: '12px', borderRadius: '8px', width: '30%' }} value={tipoChave} onChange={(e) => setTipoChave(e.target.value)}>
                <option value="EMAIL">E-mail</option>
                <option value="CPF">CPF</option>
                <option value="ALEATORIA">Aleatória</option>
              </select>
              <Input style={{ margin: 0, width: '70%' }} required value={novaChave} onChange={(e) => setNovaChave(e.target.value)} placeholder="Digite a chave..." />
            </div>
            {statusMsg && <p style={{ fontWeight: 'bold', color: statusMsg.includes('Erro') ? '#dc2626' : '#16a34a' }}>{statusMsg}</p>}
            <TransferBtn type="submit" style={{ backgroundColor: '#10b981' }}>Salvar Chave</TransferBtn>
          </form>
        </>
      )}

      {telaAtual === 'qr_code' && (
        <><VoltarBtn onClick={limparTelas}>⬅ Voltar</VoltarBtn><div style={{ textAlign: 'center', padding: '60px 0' }}><span style={{ fontSize: '50px' }}>🚧</span><h3>Leitor em construção</h3></div></>
      )}
    </ContainerPix>
  );
}