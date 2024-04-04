import { lazy } from "react";
import { IRouteLayout } from "@/app-core/@types/routes";
import HomeLayout from "@/layout/home";
import { APP_ROUTE_PREFIX } from "@/constant/route.constant";

export const privateRoutes: IRouteLayout[] = [
  {
    prefix: APP_ROUTE_PREFIX,
    layout: <HomeLayout />,
    children: [
      {
        key: "welcome",
        path: "",
        component: lazy(() => import("@/pages/Welcome")),
        authority: [],
      },
      {
        key: "dashboard",
        path: "dashboard",
        component: lazy(() => import("@/pages/Dashboard")),
        authority: [],
      },
    ],
  }
] 
