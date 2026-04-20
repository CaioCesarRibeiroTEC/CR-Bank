'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, CadastroBox, Title, Subtitle, FormGrid, Label, Input, SubmitButton, StyledLink } from './styled';

export default function Cadastro() {
  const [formData, setFormData] = useState({ nome: '', email: '', cpf: '', senha: '' });
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await fetch('http://localhost:3333/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (resposta.ok) {
        // Pega a resposta do backend (agora ele manda o Token junto!)
        const dados = await resposta.json();

        // 1. SALVA O LOGIN AUTOMÁTICO
        localStorage.setItem('crbank_token', dados.token);
        localStorage.setItem('crbank_usuario', JSON.stringify(dados.usuario));
        
        // 2. SINALIZA O BÔNUS (Para o Modal de R$ 500 aparecer)
        localStorage.setItem('show_welcome', 'true'); 

        // 3. REDIRECIONA DIRETO PARA A CONTA (Aqui estava o erro, antes estava '/')
        router.push('/dashboard');
      } else {
        const dadosErro = await resposta.json();
        setErro(dadosErro.erro || 'Erro ao cadastrar.');
      }
    } catch (error) {
      setErro('Erro de conexão com o servidor.');
    }
  };

  return (
    <Container>
      <CadastroBox>
        <Title>Abra sua conta</Title>
        <Subtitle>Rápido, fácil e com R$ 500 de bônus!</Subtitle>

        <FormGrid onSubmit={handleCadastro}>
          <div className="full-width">
            <Label>Nome Completo</Label>
            <Input required value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
          </div>
          <div className="full-width">
            <Label>E-mail</Label>
            <Input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <Label>CPF</Label>
            <Input required value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} />
          </div>
          <div className="full-width">
            <Label>Senha</Label>
            <Input type="password" required value={formData.senha} onChange={(e) => setFormData({...formData, senha: e.target.value})} />
          </div>

          {erro && <p className="full-width" style={{ color: '#ef4444', textAlign: 'center', fontWeight: 'bold' }}>{erro}</p>}

          <SubmitButton type="submit" className="full-width">Criar Conta</SubmitButton>
        </FormGrid>

        <p style={{ marginTop: '24px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
          Já é cliente? <StyledLink href="/">Faça login</StyledLink>
        </p>
      </CadastroBox>
    </Container>
  );
}