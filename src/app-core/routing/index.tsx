import { HomeLayout } from '@/layout/home';
import { AuthLayout } from '@/layout/auth';
import { ErrorLayout } from '@/layout/error';

import PrivateRouteWrapper from './privateRoute';

import { PublicRoute } from '@/route/public';
import { PrivateRoute } from '@/route/private';

const AppRoutes = () => [
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [...PublicRoute],
	},
	{
		path: '/error',
		element: <ErrorLayout />,
	},
	{
		path: '/',
		element: (
			<PrivateRouteWrapper>
				<HomeLayout />
			</PrivateRouteWrapper>
		),
		children: [...PrivateRoute],
	},
];

export { AppRoutes };
