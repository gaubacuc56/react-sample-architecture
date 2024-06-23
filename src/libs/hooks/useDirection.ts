import { useEffect } from "react";
import type { Direction } from "@app-core/@types/theme";
import { useTheme } from "./useTheme";

function useDirection(): [
    direction: Direction,
    updateDirection: (dir: Direction) => void,
] {
    const { direction, ThemeActions } = useTheme();

    const updateDirection = (dir: Direction) => {
        ThemeActions.setDirection(dir);
    };

    useEffect(() => {
        if (window === undefined) {
            return;
        }
        const root = window.document.documentElement;
        root.setAttribute("dir", direction);
    }, [direction]);

    return [direction, updateDirection];
}

export default useDirection;
