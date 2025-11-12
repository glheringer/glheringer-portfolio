import { useEffect } from 'react';
import { useThemeStore } from '@/features/theme/store/themeStore';
import { useActionCenterStore } from './useActionCenter';
import { useReducedMotionStore } from './useReducedMotion';
import { toast } from 'sonner';

interface ShortcutConfig {
  key: string;
  description: string;
  action: () => void;
  showToast?: boolean;
}

export const useKeyboardShortcuts = () => {
  const { toggleTheme, theme } = useThemeStore();
  const { toggleActionCenter } = useActionCenterStore();
  const { toggleReducedMotion, reducedMotion } = useReducedMotionStore();

  const shortcuts: ShortcutConfig[] = [
    {
      key: 'd',
      description: 'Alternar Modo Escuro',
      action: () => {
        toggleTheme();
        const newTheme = theme === 'light' ? 'dark' : 'light';
        toast.success(`Modo ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`, {
          duration: 1500,
          position: 'bottom-right',
        });
      },
      showToast: true,
    },
    {
      key: 'q',
      description: 'Abrir/Fechar Acesso Rápido',
      action: () => {
        toggleActionCenter();
      },
      showToast: false,
    },
    {
      key: 'r',
      description: 'Reduzir Movimento',
      action: () => {
        toggleReducedMotion();
        const newState = !reducedMotion;
        toast.success(`Reduzir Movimento ${newState ? 'ativado' : 'desativado'}`, {
          duration: 1500,
          position: 'bottom-right',
        });
      },
      showToast: true,
    },
  ];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignora atalhos quando o usuário está digitando em inputs, textareas, etc.
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (isTyping) return;

      const key = event.key.toLowerCase();
      const shortcut = shortcuts.find(s => s.key === key);

      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [theme]); // Adiciona theme como dependência para atualizar o toast corretamente

  return { shortcuts };
};
