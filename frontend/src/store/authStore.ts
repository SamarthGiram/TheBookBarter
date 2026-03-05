import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
    id: string;
    name: string;
    email: string;
    location: string;
    coins: number;
    depositPaid: boolean;
    rating?: number;
    phone?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
}

// Initial state from cookies if available
const getInitialState = () => {
    if (typeof window === 'undefined') return { user: null, token: null, isAuthenticated: false };
    const token = Cookies.get('token');
    const userStr = Cookies.get('user');
    let user = null;
    try {
        if (userStr) user = JSON.parse(userStr);
    } catch (e) { }

    return {
        token: token || null,
        user: user,
        isAuthenticated: !!token && !!user
    }
};

export const useAuthStore = create<AuthState>((set) => ({
    ...getInitialState(),

    login: (user, token) => {
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
        set({ user, token, isAuthenticated: true });
    },

    logout: () => {
        Cookies.remove('token');
        Cookies.remove('user');
        set({ user: null, token: null, isAuthenticated: false });
    },

    updateUser: (data) => set((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, ...data };
        Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
        return { user: updatedUser };
    }),
}));
