import { create, StateCreator } from 'zustand';
import type { AuthStatus, User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { devtools, persist } from 'zustand/middleware';

export interface AuthState {
    status: AuthStatus;
    user?: User;
    token?: string;

    loginUser: (email: string, password: string) => Promise<void>;
}

const storeAPI: StateCreator<AuthState, [['zustand/devtools', never]]> = (
    set
) => ({
    status: 'pending',
    user: undefined,
    token: undefined,

    loginUser: async (email: string, password: string) => {
        try {
            const { token, ...user } = await AuthService.login(email, password);
            console.log({ token, user });
            set({ status: 'authorized', token, user });
        } catch (error) {
            set({ status: 'authorized', token: undefined, user: undefined });
        }
    },
});

export const useAuthStore = create<AuthState>()(
    devtools(persist(storeAPI, { name: 'auth-storage' }))
);
