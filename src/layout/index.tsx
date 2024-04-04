import { useMemo, lazy, Suspense, LazyExoticComponent } from 'react'
import {
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_MODERN,
    LAYOUT_TYPE_SIMPLE,
    LAYOUT_TYPE_STACKED_SIDE,
    LAYOUT_TYPE_DECKED,
    LAYOUT_TYPE_BLANK,
} from '@/constant/theme.constant'
import { useSelector } from 'react-redux'
import { layout } from '@/features/theme/theme.slice'
import { LayoutType } from '@/app-core/@types/theme'
import useLocale from '@/hooks/useLocale'
import useDirection from '@/hooks/useDirection'
import { useAuthentication } from '@/hooks/useAuthentication'

const layouts :  Record<LayoutType, LazyExoticComponent<() => JSX.Element>>  = {
    [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./home')),
    // 5 items below will change the import path according to project's requirement
    [LAYOUT_TYPE_MODERN]: lazy(() => import('./home')),
    [LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import('./home')),
    [LAYOUT_TYPE_SIMPLE]: lazy(() => import('./home')),
    [LAYOUT_TYPE_DECKED]: lazy(() => import('./home')),
    [LAYOUT_TYPE_BLANK]: lazy(() => import('./home')),
}

const Layout = () => {

    const layoutType = useSelector(layout).type;

    const authenticated = useAuthentication();
    
    useDirection()
    useLocale()

    const AppLayout = useMemo(() => {
        if (authenticated) {
            return layouts[layoutType]
        }
        return lazy(() => import('./auth'))
    }, [layoutType, authenticated])

    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                {/*     <Loading loading={true} /> */}
                </div>
            }
        >
            <AppLayout />
        </Suspense>
    )
}

export default Layout
