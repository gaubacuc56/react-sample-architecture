import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProgressSpinner } from 'primereact/progressspinner';

import AuthorityGuard from "./AuthorityGuard";
import AppRoute from "./AppRoute";
import PrivateRoute from "./PrivateRoute";

import { privateRoutes } from "@/route/private";
import { publicRoutes } from "@/route/public";

import { userAuthority } from "@/features/auth/auth.slice";

// import { LayoutType } from '../@types/theme'

// import { AUTHENTICATED_ENTRY_PATH } from '../config'
// interface ViewsProps {
//     pageContainerType?: 'default' | 'gutterless' | 'contained'
//     layout?: LayoutType
// }

// type AllRoutesProps = ViewsProps

export const AllRoutes = (/* props: AllRoutesProps */) => {
  const authorities = useSelector(userAuthority);
  return (
    <Suspense fallback={<ProgressSpinner/>}>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          {/* <Route
                    path="/"
                    element={<Navigate replace to={authenticatedEntryPath} />}
                /> */}
          {privateRoutes.map((route, index) => (
            <Route
              key={route.key + index}
              path={route.path}
              element={
                <AuthorityGuard
                  userAuthority={authorities}
                  authority={route.authority}
                >
                  {/* <PageContainer {...props} {...route.meta}> */}
                  <AppRoute
                    routeKey={route.key}
                    component={route.component}
                    {...route.meta}
                  />
                  {/* </PageContainer> */}
                </AuthorityGuard>
              }
            />
          ))}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};
