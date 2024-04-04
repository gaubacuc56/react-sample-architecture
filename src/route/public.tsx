import { lazy } from "react";
import { IRouteLayout } from "@/app-core/@types/routes";
import {
  AUTH_ROUTE_PREFIX,
  ERROR_ROUTE_PREFIX,
} from "@/constant/route.constant";
import AuthLayout from "@/layout/auth";
import { ErrorLayout } from "@/layout/error";

export const publicRoutes: IRouteLayout[] = [
  {
    prefix: AUTH_ROUTE_PREFIX,
    layout: <AuthLayout />,
    children: [
      {
        key: "sign-in",
        path: "sign-in",
        component: lazy(() => import("@/pages/SignIn")),
        authority: [],
      },
    ],
  },
  {
    prefix: ERROR_ROUTE_PREFIX,
    layout: <ErrorLayout />,
    children: [
      {
        key: "forbidden",
        path: "forbidden",
        component: lazy(() => import("@/pages/Error/Forbidden")),
        authority: [],
      },
    ],
  },
];
