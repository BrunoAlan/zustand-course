import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

interface Bear {
    id: number;
    name: string;
}

interface BearState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;

    bears: Bear[];

    totalBears: () => number;

    increaseBlackBears: (by: number) => void;
    increasePolarBears: (by: number) => void;
    increasePandaBears: (by: number) => void;

    doNothing: () => void;
    addBear: () => void;
    clearBears: () => void;
}

const storeAPI: StateCreator<BearState> = (set, get) => ({
    blackBears: 10,
    polarBears: 5,
    pandaBears: 1,
    bears: [
        { id: 1, name: 'Bear #1' },
        { id: 2, name: 'Bear #2' },
        { id: 3, name: 'Bear #3 ' },
    ],

    totalBears: () => {
        return get().blackBears + get().polarBears + get().pandaBears;
    },

    increaseBlackBears: (by: number) =>
        set((state) => ({ blackBears: state.blackBears + by })),

    increasePolarBears: (by: number) =>
        set((state) => ({ polarBears: state.polarBears + by })),

    increasePandaBears: (by: number) =>
        set((state) => ({ pandaBears: state.pandaBears + by })),

    doNothing: () => set((state) => ({ bears: [...state.bears] })),

    addBear: () =>
        set((state) => ({
            bears: [
                ...state.bears,
                {
                    id: state.bears.length + 1,
                    name: `Bear #${state.bears.length + 1}`,
                },
            ],
        })),
    clearBears: () => set({ bears: [] }),
});

export const useBearStore = create<BearState>()(
    persist(storeAPI, { name: 'bear-storage' })
);
