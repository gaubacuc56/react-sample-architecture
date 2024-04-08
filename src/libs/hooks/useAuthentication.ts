import { useGetUserQuery } from "@libs/features/auth/auth.service";

export const useAuthentication = () => {
    const {isSuccess} = useGetUserQuery();
    return isSuccess;
}