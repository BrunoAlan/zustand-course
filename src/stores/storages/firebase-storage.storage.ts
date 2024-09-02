/* eslint-disable no-useless-catch */
import { createJSONStorage, StateStorage } from 'zustand/middleware';

const firebaseURL = 'https://zustand-937ac-default-rtdb.firebaseio.com/zustand';

const firebaseAPI: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${firebaseURL}/${name}.json`).then(
                (res) => res.json()
            );
            return JSON.stringify(data);
        } catch (error) {
            throw error;
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        const data = await fetch(`${firebaseURL}/${name}.json`, {
            method: 'PUT',
            body: value,
        }).then((res) => res.json());
        return;
    },
    removeItem: function (name: string): void | Promise<void> {
        console.log('removeItem', name);
    },
};

export const firebaseStorage = createJSONStorage(() => firebaseAPI);
