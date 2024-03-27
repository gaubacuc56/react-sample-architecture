/* eslint-disable react-hooks/rules-of-hooks */
import {  useSelector } from 'react-redux';
import { useGetUserQuery } from './auth.service';
import { authToken } from './auth.slice';
import { APP_AUTHORIZATION_HEADER } from '@/app-core/config';

export const AuthorizationHeader = () : Record<string, string | undefined> => {
   const token = useSelector(authToken);
   return { 'Authorization': APP_AUTHORIZATION_HEADER + token } ;
}

export const useAuthentication = () => {
    const {isSuccess} = useGetUserQuery();
    return isSuccess;
}