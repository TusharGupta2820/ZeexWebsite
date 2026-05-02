// Type declarations for JavaScript modules

declare module '../../components/animations/useParallax' {
  export default function useParallax(speed?: number): (ref: React.RefObject<HTMLElement>) => void;
}

declare module '../../components/animations/useCursorGlow' {
  export default function useCursorGlow(): void;
}

declare module '../../components/animations/LenisProvider' {
  import { ReactNode } from 'react';
  export default function LenisProvider({ children }: { children: ReactNode }): JSX.Element;
}

declare module '../../components/3d/HeroScene' {
  import { JSX } from 'react';
  export default function HeroScene(): JSX.Element;
}

declare module '@/components/animations/useParallax' {
  export default function useParallax(speed?: number): (ref: React.RefObject<HTMLElement>) => void;
}

declare module '@/components/animations/useCursorGlow' {
  export default function useCursorGlow(): void;
}

declare module '@/components/animations/LenisProvider' {
  import { ReactNode } from 'react';
  export default function LenisProvider({ children }: { children: ReactNode }): JSX.Element;
}

declare module '@/components/3d/HeroScene' {
  import { JSX } from 'react';
  export default function HeroScene(): JSX.Element;
}
