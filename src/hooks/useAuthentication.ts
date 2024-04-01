import { useGetUserQuery } from "@/features/auth/auth.service";

export const useAuthentication = () => {
    const {isSuccess} = useGetUserQuery();
    return isSuccess;
}