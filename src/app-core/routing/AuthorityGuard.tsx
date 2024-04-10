import { PropsWithChildren } from "react";
import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

import useAuthority from "@libs/hooks/useAuthority";
import { userAuthority } from "@libs/features/auth/auth.slice";

import {
  UNAUTHORIZED_ENTRY_PATH,
} from "@/constant/route.constant";

type AuthorityGuardProps = PropsWithChildren<{
  userAuthority?: string[];
  authority?: string[];
}>;

const AuthorityGuard = (props: AuthorityGuardProps) => {
  const { authority = [], children } = props;

  const _userAuthority = useSelector(userAuthority);

  const roleMatched = useAuthority(_userAuthority, authority);

  return (
    <>
      {roleMatched ? (
        children
      ) : (
        <Navigate
          to={UNAUTHORIZED_ENTRY_PATH}
          replace
        />
      )}
    </>
  );
};

export default AuthorityGuard;
