/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutType } from './theme'
import type { ComponentType, LazyExoticComponent, ReactNode } from 'react'

export interface Meta {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    header?: string | ReactNode
    headerContainer?: boolean
    extraHeader?: LazyExoticComponent<() => JSX.Element>
    footer?: boolean
    layout?: LayoutType
}

export type IRoute = {
    key: string
    path: string
    component: LazyExoticComponent<ComponentType<any>>
    authority: string[]
    meta?: Meta
}

export type IRouteLayout  = {
    prefix: string,
    layout: JSX.Element,
    children: IRoute[]
}