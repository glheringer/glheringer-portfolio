import { create } from 'zustand';

interface ActionCenterState {
  isOpen: boolean;
  toggleActionCenter: () => void;
  openActionCenter: () => void;
  closeActionCenter: () => void;
}

export const useActionCenterStore = create<ActionCenterState>((set) => ({
  isOpen: false,
  toggleActionCenter: () => set((state) => ({ isOpen: !state.isOpen })),
  openActionCenter: () => set({ isOpen: true }),
  closeActionCenter: () => set({ isOpen: false }),
}));
