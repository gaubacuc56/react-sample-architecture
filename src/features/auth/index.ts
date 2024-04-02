/* eslint-disable react-hooks/rules-of-hooks */
import {  useSelector } from 'react-redux';
import { appToken } from './auth.slice';
import { APP_AUTHORIZATION_HEADER } from '@/app-core/config';

export const AuthorizationHeader = () : Record<string, string | undefined> => {
   const token = useSelector(appToken);
   return { 'Authorization': APP_AUTHORIZATION_HEADER + token } ;
}

