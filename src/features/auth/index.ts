import { useSelector, useDispatch } from 'react-redux';
import { authToken } from './auth.slice';
export const useAuth = () => {
 const token = useSelector(authToken);
}