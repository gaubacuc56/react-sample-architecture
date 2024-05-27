import { memo, useMemo, type MouseEvent } from "react";
import classNames from "classnames";
import { HiChevronLeft } from "react-icons/hi";
import { CommonProps } from "@app-core/@types/common";

interface PrevProps extends CommonProps {
	currentPage: number;
	pagerClass: {
		default: string;
		inactive: string;
		active: string;
		disabled: string;
	};
	onPrev: (e: MouseEvent<HTMLSpanElement>) => void;
}

const Prev = memo((props: PrevProps) => {
	const { currentPage, pagerClass, onPrev } = props;

	const disabled = currentPage <= 1;

	const onPrevClick = (e: MouseEvent<HTMLSpanElement>) => {
		if (disabled) {
			return;
		}
		onPrev(e);
	};

	const pagerPrevClass = useMemo(() => {
		return classNames(
			pagerClass.default,
			"pagination-pager-prev",
			disabled ? pagerClass.disabled : pagerClass.inactive
		);
	}, [
		disabled,
		pagerClass.default,
		pagerClass.disabled,
		pagerClass.inactive,
	]);

	return (
		<span
			className={pagerPrevClass}
			role="presentation"
			onClick={onPrevClick}
		>
			<HiChevronLeft />
		</span>
	);
});

export default Prev;
