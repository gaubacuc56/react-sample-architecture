import { useGetUserQuery } from "@libs/features/auth/auth.service";

export const useAuthentication = () => {
    const {data, isSuccess} = useGetUserQuery();
    console.log(data)
    return isSuccess;
}