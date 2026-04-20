'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContainerPerfil, AvatarWrapper, AvatarPreview, AvatarPlaceholder, FileInputLabel } from './styled';
import { Input, TransferBtn } from '../pix/styled'; 

export default function PerfilPage() {
  const [usuario, setUsuario] = useState<any>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [avatarBase64, setAvatarBase64] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const dados = localStorage.getItem('crbank_usuario');
    if (!dados) { router.push('/'); return; }
    
    const userLocal = JSON.parse(dados);
    setUsuario(userLocal);
    setNome(userLocal.nome);
    setEmail(userLocal.email);
    setAvatarBase64(userLocal.avatar || '');
  }, [router]);

  // Converte a imagem escolhida para texto Base64
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Salvando dados...');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const resposta = await fetch(`${API_URL}/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, avatar: avatarBase64 }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        // Atualiza a foto e o nome no localStorage para refletir no cabeçalho
        localStorage.setItem('crbank_usuario', JSON.stringify(dados.usuario));
        setStatusMsg('✅ Perfil atualizado com sucesso!');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setStatusMsg('❌ Erro ao atualizar o perfil.');
      }
    } catch (error) {
      setStatusMsg('❌ Erro de conexão com o servidor.');
    }
  };

  if (!usuario) return null;

  return (
    <ContainerPerfil>
      <h2 style={{ marginTop: 0, marginBottom: '30px', color: '#111827' }}>Meu Perfil</h2>
      
      <form onSubmit={handleSalvar}>
        <AvatarWrapper>
          {avatarBase64 ? (
            <AvatarPreview src={avatarBase64} alt="Avatar" />
          ) : (
            <AvatarPlaceholder>👤</AvatarPlaceholder>
          )}
          <FileInputLabel>
            📷 Alterar Foto
            <input type="file" accept="image/*" onChange={handleFotoChange} />
          </FileInputLabel>
        </AvatarWrapper>

        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Nome Completo</label>
        <Input required value={nome} onChange={(e) => setNome(e.target.value)} />
        
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>E-mail de Cadastro</label>
        <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>CPF (Não alterável)</label>
        <Input value={usuario.cpf} disabled style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
        
        {statusMsg && (
          <p style={{ fontWeight: 'bold', textAlign: 'center', color: statusMsg.includes('Erro') ? '#dc2626' : '#16a34a' }}>
            {statusMsg}
          </p>
        )}
        
        <TransferBtn type="submit">Salvar Alterações</TransferBtn>
      </form>
    </ContainerPerfil>
  );
}