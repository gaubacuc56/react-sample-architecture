/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useCallback } from "react";
import type { ComponentType } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@libs/hooks/useTheme";
import { LayoutType } from "../@types/theme";

export type AppRouteProps<T> = {
    component: ComponentType<T>;
    routeKey: string;
    layout?: LayoutType;
};

const AppRoute = <T extends Record<string, unknown>>({
    component: Component,
    routeKey,
    ...props
}: AppRouteProps<T>) => {
    const { ThemeActions, layout } = useTheme();

    const location = useLocation();

    const layoutType = layout.type;
    const previousLayout = layout.previousType;

    const handleLayoutChange = useCallback(() => {
        if (props.layout && props.layout !== layoutType) {
            ThemeActions.setPreviousLayout(layoutType);
            ThemeActions.setLayout(props.layout);
        }

        if (!props.layout && previousLayout && layoutType !== previousLayout) {
            ThemeActions.setLayout(previousLayout);
            // ThemeActions.setPreviousLayout("")
        }
    }, [layoutType, previousLayout, props.layout]);

    useEffect(() => {
        handleLayoutChange();
    }, [location, handleLayoutChange]);

    return <Component {...(props as T)} />;
};

export default AppRoute;
