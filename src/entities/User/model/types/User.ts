export interface IUser {
    id: number;
    token: string;
    nickname: string;
    email: string;
    avatar: string;
    diskSpace: number;
    usedSpace: number;
}

export interface UserSchema {
    authData?: IUser;
    isAuthLoading: boolean;
}
