export interface ILoginRequest {
    email: string;
    password: string;
}
export interface IForgetPasswordRequest {
    email: string;
}

export interface IResetPasswordRequest {
    resetKey: string;
    newPassword: string;
}
