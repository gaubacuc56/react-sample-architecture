import { lazy } from "react";
import { IRouteLayout } from "@app-core/@types/routes";
import { HomeLayout, AuthLayout, ErrorLayout } from "@layout/index";
import {
  APP_ROUTE_PREFIX,
  AUTH_ROUTE_PREFIX,
  ERROR_ROUTE_PREFIX,
} from "@constant/route.constant";

export const routes: IRouteLayout[] = [
  {
    prefix: APP_ROUTE_PREFIX,
    layout: <HomeLayout />,
    isPrivate: true,
    children: [
      {
        key: "",
        path: "",
        component: lazy(() => import("@pages/Welcome")),
        authority: [],
      },
      {
        key: "dashboard",
        path: "dashboard",
        component: lazy(() => import("@pages/Dashboard")),
        authority: [],
      },
    ],
  },
  {
    prefix: AUTH_ROUTE_PREFIX,
    layout: <AuthLayout />,
    children: [
      {
        key: "sign-in",
        path: "sign-in",
        component: lazy(() => import("@pages/SignIn")),
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
        component: lazy(() => import("@pages/Error/Forbidden")),
        authority: [],
      },
    ],
  },
];
