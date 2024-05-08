import { ComponentType, ForwardedRef, forwardRef } from "react";
import { useAppSelector } from "@/app-core/redux-manager/method";

import useAuthority from "@libs/hooks/useAuthority";

interface WithAuthorizationProps {
	authorities: string[];
}

/**
 * withAuthorization is a Higher-Order Component (HOC) that wraps a React component,
 * enhancing it with authorization logic. The HOC takes a permission prop and checks
 * if the user has permission to access that feature using the useAuthorization hook.
 * If the user has permission, it renders the wrapped component; otherwise, it returns null.
 *
 * @example
 * const DeleteButton = withAuthorization(MyComponent);
 * <DeleteButton authorities={[permission.DELETE]}/>
 *
 * @param WrappedComponent - The component to be wrapped and enhanced with authorization logic.
 * @returns A new functional component that conditionally renders the wrapped component based on authorization.
 */
export const withAuthorization = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const WithAuth = (
		props: P & WithAuthorizationProps,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ref: ForwardedRef<any>
	) => {
		const { authorities, ...otherProps } = props;
		const _userAuthority = useAppSelector(
			(state) => state.authReducer.authority
		);

		const roleMatched = useAuthority(_userAuthority, authorities);

		if (roleMatched)
			return <WrappedComponent ref={ref} {...(otherProps as P)} />;
		return null;
	};

	return forwardRef(WithAuth);
};
