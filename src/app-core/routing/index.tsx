import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AuthorityGuard from "./AuthorityGuard";

import ErrorBoundary from "@pages/Error/ErrorBoundary";
import AppRoute from "./AppRoute";
import { publicRoutes } from "@/route/public";
import { privateRoutes } from "@/route/private";
import { APP_ROUTE_PREFIX } from "@/constant/route.constant";
import { IRouteLayout } from "../@types/routes";

const appRoutes: IRouteLayout[] = [...publicRoutes, ...privateRoutes];

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" errorElement={<ErrorBoundary />}>
      <Route path="*" element={<Navigate to={APP_ROUTE_PREFIX} replace />} errorElement={<ErrorBoundary />}  />
      {appRoutes.map((item) => (
        <Route
          key={item.prefix}
          path={item.prefix}
          element={item.layout}
          errorElement={<ErrorBoundary />}
        >
          {item.children.map((child) => (
            <Route
              key={child.key}
              path={child.path}
              element={
                <AuthorityGuard authority={child.authority}>
                  <AppRoute
                    routeKey={child.key}
                    component={child.component}
                    {...child.meta}
                  />
                </AuthorityGuard>
              }
            />
          ))}
        </Route>
      ))}
    </Route>
  )
);
