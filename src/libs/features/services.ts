// Api slices import
import { authService } from './auth/auth.service';

export const fetchReducer = {
    [authService.reducerPath]: authService.reducer
}
export const fetchMiddleware = [
    authService
]