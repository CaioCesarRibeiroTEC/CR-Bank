'use client';

import styled, { keyframes } from 'styled-components';

export const CardCanvas = styled.div`
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export const FlipContainer = styled.div<{ $isFlipped: boolean }>`
  width: 400px;
  height: 250px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  cursor: pointer;
  right: 32px
`;

const CardBase = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  color: white;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
`;

export const CardFront = styled(CardBase)`
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
`;

export const CardBack = styled(CardBase)`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  transform: rotateY(180deg);
  justify-content: center;
`;

export const Chip = styled.div`
  width: 50px;
  height: 40px;
  background: linear-gradient(135deg, #ffd700, #b8860b);
  border-radius: 8px;
`;