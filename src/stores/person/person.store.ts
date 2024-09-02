import { create, type StateCreator } from 'zustand';
import {
    createJSONStorage,
    devtools,
    persist,
    StateStorage,
} from 'zustand/middleware';
import { customSessionStorage } from '../storages/session-storage.storage';
import { firebaseStorage } from '../storages/firebase-storage.storage';

interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const PersonActions = {
    setFirstName: 'setFirstName',
    setLastName: 'setLastName',
};

const storeAPI: StateCreator<
    PersonState & Actions,
    [['zustand/devtools', never]]
> = (set, get) => ({
    firstName: '',
    lastName: '',
    setFirstName: (value: string) =>
        set({ firstName: value }, false, PersonActions.setFirstName),
    setLastName: (value: string) =>
        set({ lastName: value }, false, PersonActions.setLastName),
});

export const usePersonStore = create<PersonState & Actions>()(
    devtools(
        persist(storeAPI, {
            name: 'person-storage',
            storage: firebaseStorage,
        })
    )
);
