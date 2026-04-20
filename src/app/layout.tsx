import type { Metadata } from "next";
import StyledComponentsRegistry from "../lib/registry"; // 1. Importa aqui

export const metadata: Metadata = {
  title: "CR Bank",
  description: "Seu banco digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Removemos o script do Tailwind daqui */}
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}