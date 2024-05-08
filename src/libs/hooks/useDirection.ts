import { useEffect } from "react";

import type { Direction } from "@app-core/@types/theme";
import { setDirection } from "@libs/features/store";
import {
	useAppDispatch,
	useAppSelector,
} from "@/app-core/redux-manager/method";

function useDirection(): [
	direction: Direction,
	updateDirection: (dir: Direction) => void
] {
	const direction = useAppSelector((state) => state.themeReducer.direction);

	const dispatch = useAppDispatch();

	const updateDirection = (dir: Direction) => {
		dispatch(setDirection(dir));
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
