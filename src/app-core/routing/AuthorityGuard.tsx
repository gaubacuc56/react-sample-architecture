import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux-manager/method";

import useAuthority from "@libs/hooks/useAuthority";

import { UNAUTHORIZED_ENTRY_PATH } from "@constant/route.constant";

type AuthorityGuardProps = PropsWithChildren<{
	userAuthority?: string[];
	authority?: string[];
}>;

const AuthorityGuard = (props: AuthorityGuardProps) => {
	const { authority = [], children } = props;

	const _userAuthority = useAppSelector(
		(state) => state.authReducer.authority
	);

	const roleMatched = useAuthority(_userAuthority, authority);

	return (
		<>
			{roleMatched ? (
				children
			) : (
				<Navigate to={UNAUTHORIZED_ENTRY_PATH} replace />
			)}
		</>
	);
};

export default AuthorityGuard;
