export interface AuthSchema {
    nickname: string;
    email: string;
    password: string;
    isLoading: boolean;
    error?: string;
}
