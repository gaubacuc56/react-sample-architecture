import { AuthService } from "./auth";
import { LiveScoreService } from "./livescore";

export const rtkQueryService = {
    [AuthService.reducerPath]: AuthService.reducer,
    [LiveScoreService.reducerPath]: LiveScoreService.reducer,
};

export const rtkQueryMiddleware = [AuthService, LiveScoreService];

export * from "./auth";
export * from "./livescore";
