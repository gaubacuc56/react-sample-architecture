import {
	ReactNode,
	useState,
	useEffect,
	useRef,
	forwardRef,
	memo,
} from "react";
import classNames from "classnames";

import type { CommonProps } from "@app-core/@types/common";
import { Shape } from "@app-core/@types/theme";

import useMergedRef from "@libs/hooks/useMergeRef";

export interface AvatarProps extends CommonProps {
	alt?: string;
	icon?: ReactNode;
	onClick?: () => void;
	size?: "lg" | "md" | "sm" | number;
	shape?: Exclude<Shape, "none"> | "square";
	src?: string;
	srcSet?: string;
}

const Avatar = memo(
	forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
		const {
			alt,
			className,
			icon,
			shape = "rounded",
			size = "md",
			src,
			srcSet,
			...rest
		} = props;

		let { children } = props;
		const [scale, setScale] = useState(1);

		const avatarChildren = useRef<HTMLSpanElement>(null);
		const avatarNode = useRef<HTMLSpanElement>(null);

		const avatarMergeRef = useMergedRef(ref, avatarNode);

		const innerScale = () => {
			if (!avatarChildren.current || !avatarNode.current) {
				return;
			}
			const avatarChildrenWidth = avatarChildren.current.offsetWidth;
			const avatarNodeWidth = avatarNode.current.offsetWidth;
			if (avatarChildrenWidth === 0 || avatarNodeWidth === 0) {
				return;
			}
			setScale(
				avatarNodeWidth - 8 < avatarChildrenWidth
					? (avatarNodeWidth - 8) / avatarChildrenWidth
					: 1
			);
		};

		useEffect(() => {
			innerScale();
		}, [scale, children]);

		const sizeStyle =
			typeof size === "number"
				? {
						width: size,
						height: size,
						minWidth: size,
						lineHeight: `${size}px`,
						fontSize: icon ? size / 2 : 12,
					}
				: {};

		const classes = classNames(
			"avatar",
			`avatar-${shape}`,
			typeof size === "string" ? `avatar-${size}` : "",
			className
		);

		if (src) {
			children = (
				<img
					className={`avatar-img avatar-${shape}`}
					src={src}
					srcSet={srcSet}
					alt={alt}
					loading="lazy"
				/>
			);
		} else if (icon) {
			children = (
				<span
					className={classNames("avatar-icon", `avatar-icon-${size}`)}
				>
					{icon}
				</span>
			);
		} else {
			const childrenSizeStyle =
				typeof size === "number" ? { lineHeight: `${size}px` } : {};
			const stringCentralized = {
				transform: `translateX(-50%) scale(${scale})`,
			};
			children = (
				<span
					ref={avatarChildren}
					className={`avatar-string ${
						typeof size === "number" ? "" : `avatar-inner-${size}`
					}`}
					style={{
						...childrenSizeStyle,
						...stringCentralized,
						...(typeof size === "number" ? { height: size } : {}),
					}}
				>
					{children}
				</span>
			);
		}

		return (
			<span
				ref={avatarMergeRef}
				className={classes}
				style={{ ...sizeStyle, ...rest.style }}
				{...rest}
			>
				{children}
			</span>
		);
	})
);

export default Avatar;
