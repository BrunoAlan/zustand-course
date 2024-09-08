import { StateCreator } from 'zustand';

export interface ConfirmationSlice {
    confirmation: boolean;
    setConfirmation: (confirmation: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (
    set,
    get
) => ({
    confirmation: false,
    setConfirmation: (confirmation: boolean) => {
        set({ confirmation });
    },
});
