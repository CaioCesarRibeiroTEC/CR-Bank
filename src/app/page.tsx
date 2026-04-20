'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, LoginBox, LogoTitle, Subtitle, Form, Label, Input, SubmitButton, StyledLink } from './styled';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        localStorage.setItem('crbank_token', dados.token);
        localStorage.setItem('crbank_usuario', JSON.stringify(dados.usuario));
        router.push('/dashboard');
      } else {
        const dadosErro = await resposta.json();
        setErro(dadosErro.erro || 'Falha no login');
      }
    } catch (error) {
      setErro('Erro de conexão com o servidor.');
    }
  };

  return (
    <Container>
      <LoginBox>
        <LogoTitle>CR Bank</LogoTitle>
        <Subtitle>Acesse sua conta</Subtitle>

        <Form onSubmit={handleLogin}>
          <div>
            <Label>E-mail</Label>
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Senha</Label>
            <Input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>

          {erro && <p style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center' }}>{erro}</p>}

          <SubmitButton type="submit">Entrar</SubmitButton>
        </Form>

        <p style={{ marginTop: '24px', color: '#6b7280', fontSize: '14px' }}>
          Não tem uma conta? <StyledLink href="/cadastro">Abra agora</StyledLink>
        </p>
      </LoginBox>
    </Container>
  );
}