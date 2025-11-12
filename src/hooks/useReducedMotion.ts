import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

interface ReducedMotionState {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  setReducedMotion: (value: boolean) => void;
}

export const useReducedMotionStore = create<ReducedMotionState>()(
  persist(
    (set) => ({
      reducedMotion: false,
      toggleReducedMotion: () =>
        set((state) => {
          const newValue = !state.reducedMotion;
          applyReducedMotion(newValue);
          return { reducedMotion: newValue };
        }),
      setReducedMotion: (value) => {
        applyReducedMotion(value);
        set({ reducedMotion: value });
      },
    }),
    {
      name: 'reduced-motion-storage',
    }
  )
);

// Aplica ou remove a classe de movimento reduzido
function applyReducedMotion(enabled: boolean) {
  if (enabled) {
    document.documentElement.classList.add('reduce-motion');
  } else {
    document.documentElement.classList.remove('reduce-motion');
  }
}

// Hook para inicializar a preferência do sistema
export const useReducedMotionInit = () => {
  const { reducedMotion, setReducedMotion } = useReducedMotionStore();

  useEffect(() => {
    // Detecta preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Se o usuário nunca configurou, usa preferência do sistema
    const storedValue = localStorage.getItem('reduced-motion-storage');
    if (!storedValue && mediaQuery.matches) {
      setReducedMotion(true);
    } else if (reducedMotion) {
      // Aplica configuração salva
      applyReducedMotion(true);
    }

    // Listener para mudanças na preferência do sistema
    const handleChange = (e: MediaQueryListEvent) => {
      const storedValue = localStorage.getItem('reduced-motion-storage');
      if (!storedValue) {
        setReducedMotion(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [reducedMotion, setReducedMotion]);
};
