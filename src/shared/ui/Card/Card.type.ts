import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  pad?: string; // rem 문자열, 기본 '2.4rem'
  hover?: boolean;
  children?: ReactNode;
}
