import { LayoutType } from './theme'
import type { LazyExoticComponent, ReactNode } from 'react'

export interface IRoute {
    path: string,
    element: React.ReactNode,
    children?: IRoute[],
}

export interface Meta {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    header?: string | ReactNode
    headerContainer?: boolean
    extraHeader?: LazyExoticComponent<() => JSX.Element>
    footer?: boolean
    layout?: LayoutType
}

export type Route = {
    key: string
    path: string
    component: LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>
    authority: string[]
    meta?: Meta
}

export type Routes = Route[]
