// Api slices import
import { authService } from './auth/auth.service';

// export for redux configuration
export const rtkQueryService = {
    [authService.reducerPath]: authService.reducer
}
export const rtkQueryMiddleware = [
    authService
]

// export for internal usage
export * from './auth/auth.service'