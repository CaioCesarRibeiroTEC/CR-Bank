'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ContainerExtrato, TransacaoItem, TransacaoInfo, IconeBox, DetalhesTexto, 
  TipoTexto, DataTexto, ValorTexto, InfoPessoa, ReceiptBtn, 
  Overlay, ReceiptBox, ReceiptHeader, CloseBtn, ReceiptBody, ReceiptRow, Label, DataText
} from './styled';

export default function ExtratoPage() {
  const [historico, setHistorico] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>(null);
  const [comprovanteAtivo, setComprovanteAtivo] = useState<any>(null);
  const router = useRouter();

  // Função para mascarar o CPF (Ex: 123.456.789-00 -> 123.***.***-00)
  const mascararCPF = (cpf: string) => {
    if (!cpf) return '';
    const limpo = cpf.replace(/\D/g, ''); // Tira tudo que não é número
    if (limpo.length !== 11) return cpf;
    return `${limpo.substring(0, 3)}.***.***-${limpo.substring(9, 11)}`;
  };

  useEffect(() => {
    const dados = localStorage.getItem('crbank_usuario');
    if (!dados) { router.push('/'); return; }
    
    const user = JSON.parse(dados);
    setUsuario(user);

    const buscarDados = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      try {
        const conta = user.accounts[0];
        const resposta = await fetch(`${API_URL}/contas/${conta.numero_conta}/extrato`);
        
        if (resposta.ok) {
          const data = await resposta.json();
          setHistorico(data.historico);
        }
      } catch (error) { console.error(error); }
    };

    buscarDados();
  }, [router]);

  if (!usuario) return null;
  const minhaContaId = usuario.accounts[0].id;

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#111827' }}>Histórico de Transações</h2>
      
      <ContainerExtrato>
        {historico.length === 0 ? (
          <p style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Ainda não realizou nenhuma movimentação.</p>
        ) : (
          historico.map((item) => {
            const isSaida = item.conta_origem_id === minhaContaId;
            const data = new Date(item.criado_em);
            const tituloTransacao = item.tipo === 'TRANSFERENCIA' ? (isSaida ? 'Transferência Enviada' : 'Transferência Recebida') : 'Depósito';

            return (
              <TransacaoItem key={item.id}>
                <TransacaoInfo>
                  <IconeBox $isSaida={isSaida}>{isSaida ? '↓' : '↑'}</IconeBox>
                  <DetalhesTexto>
                    <TipoTexto>{tituloTransacao}</TipoTexto>
                    
                    {/* Exibe o nome e CPF mascarado de quem enviou/recebeu */}
                    {item.contraparte && (
                      <InfoPessoa>
                        {isSaida ? 'Para: ' : 'De: '} 
                        <strong>{item.contraparte.nome}</strong> • {mascararCPF(item.contraparte.cpf)}
                      </InfoPessoa>
                    )}

                    <DataTexto>
                      {data.toLocaleDateString('pt-BR')} às {data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </DataTexto>

                    {/* Botão de Comprovante aparece apenas se for Pix/Transferência */}
                    {item.tipo === 'TRANSFERENCIA' && (
                      <ReceiptBtn onClick={() => setComprovanteAtivo({ ...item, isSaida, data })}>
                        📄 Ver comprovante
                      </ReceiptBtn>
                    )}
                  </DetalhesTexto>
                </TransacaoInfo>

                <ValorTexto $isSaida={isSaida}>
                  {isSaida ? '-' : '+'} R$ {Number(item.valor).toFixed(2).replace('.', ',')}
                </ValorTexto>
              </TransacaoItem>
            );
          })
        )}
      </ContainerExtrato>

      {/* MODAL DO COMPROVANTE */}
      {comprovanteAtivo && (
        <Overlay onClick={(e) => e.target === e.currentTarget && setComprovanteAtivo(null)}>
          <ReceiptBox>
            <ReceiptHeader>
              <CloseBtn onClick={() => setComprovanteAtivo(null)}>✕</CloseBtn>
              <h3 style={{ margin: 0 }}>Comprovante de Pix</h3>
              <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '14px' }}>
                {comprovanteAtivo.data.toLocaleDateString('pt-BR')} às {comprovanteAtivo.data.toLocaleTimeString('pt-BR')}
              </p>
            </ReceiptHeader>
            
            <ReceiptBody>
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <Label>Valor do Pix</Label>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>
                  R$ {Number(comprovanteAtivo.valor).toFixed(2).replace('.', ',')}
                </div>
              </div>

              <ReceiptRow>
                <Label>Origem (Quem enviou)</Label>
                <DataText>{comprovanteAtivo.isSaida ? usuario.nome : comprovanteAtivo.contraparte?.nome}</DataText>
                <DataText style={{ fontSize: '13px', color: '#6b7280' }}>
                  CPF: {comprovanteAtivo.isSaida ? mascararCPF(usuario.cpf) : mascararCPF(comprovanteAtivo.contraparte?.cpf)}
                </DataText>
                <DataText style={{ fontSize: '13px', color: '#6b7280' }}>Instituição: CR Bank</DataText>
              </ReceiptRow>

              <ReceiptRow>
                <Label>Destino (Quem recebeu)</Label>
                <DataText>{comprovanteAtivo.isSaida ? comprovanteAtivo.contraparte?.nome : usuario.nome}</DataText>
                <DataText style={{ fontSize: '13px', color: '#6b7280' }}>
                  CPF: {comprovanteAtivo.isSaida ? mascararCPF(comprovanteAtivo.contraparte?.cpf) : mascararCPF(usuario.cpf)}
                </DataText>
                <DataText style={{ fontSize: '13px', color: '#6b7280' }}>Instituição: CR Bank</DataText>
              </ReceiptRow>

              <ReceiptRow style={{ borderBottom: 'none' }}>
                <Label>ID da Transação</Label>
                <DataText style={{ fontSize: '11px', wordBreak: 'break-all' }}>{comprovanteAtivo.id}</DataText>
              </ReceiptRow>
            </ReceiptBody>
          </ReceiptBox>
        </Overlay>
      )}
    </div>
  );
}