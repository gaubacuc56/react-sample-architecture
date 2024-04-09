import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ErrorBoundary from "@pages/Error/ErrorBoundary";
import { routes } from "@/routes";
import { APP_ROUTE_PREFIX } from "@constant/route.constant";

import AppRoute from "./AppRoute";
import AuthorityGuard from "./AuthorityGuard";
import AuthenticationGuard from "./AuthenticationGuard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" errorElement={<ErrorBoundary />}>
      <Route
        path="*"
        element={<Navigate to={APP_ROUTE_PREFIX} replace />}
        errorElement={<ErrorBoundary />}
      />
      {routes.map((item) => (
        <Route
          key={item.prefix}
          path={item.prefix}
          // element={item.layout}
          errorElement={<ErrorBoundary />}
          element={
            <AuthenticationGuard ignore={!item.isPrivate}>
              {item.layout}
            </AuthenticationGuard>
          }
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
