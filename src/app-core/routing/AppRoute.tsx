/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useCallback } from 'react'
import type { ComponentType } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import {
    setLayout,
    setPreviousLayout,
    layout
} from '@/libs/features/theme/theme.slice'
import { LayoutType } from '../@types/theme'

export type AppRouteProps<T> = {
    component: ComponentType<T>
    routeKey: string
    layout?: LayoutType
}

const AppRoute = <T extends Record<string, unknown>>({
    component: Component,
    routeKey,
    ...props
}: AppRouteProps<T>) => {
    const location = useLocation()

    const dispatch = useDispatch()

    const layoutType = useSelector(layout).type;
    const previousLayout = useSelector(layout).previousType;

    const handleLayoutChange = useCallback(() => {

        if (props.layout && props.layout !== layoutType) {
            dispatch(setPreviousLayout(layoutType))
            dispatch(setLayout(props.layout))
        }

        if (!props.layout && previousLayout && layoutType !== previousLayout) {
            dispatch(setLayout(previousLayout))
            dispatch(setPreviousLayout(''))
        }
    }, [dispatch, layoutType, previousLayout, props.layout])

    useEffect(() => {
        handleLayoutChange()
    }, [location, handleLayoutChange])

    return <Component {...(props as T)} />
}

export default AppRoute
