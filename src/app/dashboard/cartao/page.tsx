'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardCanvas, FlipContainer, CardFront, CardBack, Chip } from './styled';

export default function CartaoPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const [usuario, setUsuario] = useState<any>(null);
  const [cartao, setCartao] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [copiado, setCopiado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const dados = localStorage.getItem('crbank_usuario');
    if (!dados) { router.push('/'); return; }

    const user = JSON.parse(dados);
    setUsuario(user);
    buscarCartao(user.accounts[0].id);
  }, [router]);

  const buscarCartao = async (contaId: string) => {
    try {
      const res = await fetch(`${API_URL}/cartoes/${contaId}`);
      if (res.ok) {
        const dadosCartao = await res.json();
        if (dadosCartao) setCartao(dadosCartao);
      }
    } catch (error) {
      console.error("Erro ao procurar o cartão", error);
    }
  };

  const handleGerarCartao = async () => {
    setStatusMsg('A gerar o seu cartão virtual de alta segurança...');
    try {
      const res = await fetch(`${API_URL}/cartoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conta_id: usuario.accounts[0].id,
          nome_titular: usuario.nome
        }),
      });

      if (res.ok) {
        const novoCartao = await res.json();
        setCartao(novoCartao);
        setStatusMsg('✅ Cartão gerado com sucesso!');
      } else {
        setStatusMsg('❌ Erro ao gerar o cartão.');
      }
    } catch (error) {
      setStatusMsg('❌ Erro de ligação com o servidor.');
    }
  };

  const copiarNumero = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (cartao) {
      navigator.clipboard.writeText(cartao.numero.replace(/\s/g, ''));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); 
    }
  };

  if (!usuario) return null;

  return (
    <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginTop: 0, color: '#111827' }}>Cartão de Crédito Virtual</h2>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>
        Gere e gira o seu cartão virtual para compras online com máxima segurança.
      </p>

      {!cartao ? (
        <div style={{ textAlign: 'center', padding: '50px 0', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db' }}>
          <div style={{ fontSize: '60px', marginBottom: '15px' }}>💳</div>
          <h3 style={{ margin: '0 0 10px 0' }}>Ainda não tem o seu Cartão Virtual</h3>
          <p style={{ color: '#6b7280', marginBottom: '25px', padding: '0 20px' }}>
            Tenha um cartão sem anuidade, gerado instantaneamente e pronto para ser usado nas suas lojas favoritas.
          </p>
          
          {/* BOTÃO CORRIGIDO AQUI 👇 */}
          <button 
            onClick={handleGerarCartao} 
            style={{ background: '#2563eb', color: 'white', padding: '15px 40px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            Gerar Meu Cartão Virtual
          </button>
          
          {statusMsg && <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#2563eb' }}>{statusMsg}</p>}
        </div>
      ) : (
        <>
          <CardCanvas>
            <FlipContainer $isFlipped={isFlipped} onClick={() => setIsFlipped(!isFlipped)}>
              
              <CardFront>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip />
                  <span style={{ fontSize: '22px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '2px', textShadow: '0px 2px 4px rgba(0,0,0,0.3)' }}>
                    CR BANK
                  </span>
                </div>

                <div style={{ marginTop: '25px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', letterSpacing: '4px', textShadow: '1px 1px 2px rgba(0,0,0,0.4)', fontFamily: 'monospace' }}>
                    {cartao.numero}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' }}>
                  <div>
                    <div style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase' }}>Titular do Cartão</div>
                    <div style={{ fontSize: '17px', fontWeight: 'bold', letterSpacing: '1px', textShadow: '0px 1px 2px rgba(0,0,0,0.3)' }}>
                      {cartao.nome_titular}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase' }}>Validade</div>
                    <div style={{ fontSize: '17px', fontWeight: 'bold', textShadow: '0px 1px 2px rgba(0,0,0,0.3)' }}>
                      {cartao.validade}
                    </div>
                  </div>
                </div>
              </CardFront>

              <CardBack>
                <div style={{ width: '100%', height: '45px', backgroundColor: '#000', position: 'absolute', top: '25px', left: 0, opacity: 0.8 }}></div>
                <div style={{ padding: '0 30px', marginTop: '50px' }}>
                  <div style={{ fontSize: '12px', opacity: 0.8, textTransform: 'uppercase', marginBottom: '5px', textAlign: 'right', fontWeight: 'bold' }}>
                    Código CVV
                  </div>
                  <div style={{ backgroundColor: '#fff', color: '#000', padding: '10px 15px', textAlign: 'right', fontStyle: 'italic', borderRadius: '4px', fontSize: '18px', fontWeight: 'bold' }}>
                    {cartao.cvv}
                  </div>
                  <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '25px', textAlign: 'center', lineHeight: '1.4' }}>
                    Cartão de uso exclusivo digital. Não partilhe o seu CVV ou número do cartão com terceiros. <br/>Para ajuda, contacte o suporte do CR Bank.
                  </p>
                </div>
              </CardBack>

            </FlipContainer>
          </CardCanvas>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ background: 'white', border: '1px solid #d1d5db', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#374151', transition: 'all 0.2s' }}
            >
              🔄 Virar Cartão
            </button>

            <button
              onClick={copiarNumero}
              style={{ background: copiado ? '#10b981' : '#2563eb', border: 'none', color: 'white', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)' }}
            >
              {copiado ? '✅ Número Copiado!' : '📋 Copiar Número'}
            </button>
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid #e5e7eb', paddingTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', color: '#6b7280', fontSize: '14px' }}>Limite de Crédito Disponível</p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                R$ {Number(cartao.limite).toFixed(2).replace('.', ',')}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 5px 0', color: '#6b7280', fontSize: '14px' }}>Estado do Cartão</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: cartao.is_ativo ? '#d1fae5' : '#fee2e2', color: cartao.is_ativo ? '#065f46' : '#991b1b', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' }}>
                {cartao.is_ativo ? '🟢 Ativo e a Funcionar' : '🔴 Bloqueado'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}