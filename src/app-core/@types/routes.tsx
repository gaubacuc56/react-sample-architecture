/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType, LazyExoticComponent } from "react";

export type IRoute = {
    key: string;
    path: string;
    component: LazyExoticComponent<ComponentType<any>>;
    authority: string[];
    crumb?: string;
};

export type IRouteLayout = {
    prefix: string;
    layout: JSX.Element;
    children: IRoute[];
    isPrivate?: boolean;
};
