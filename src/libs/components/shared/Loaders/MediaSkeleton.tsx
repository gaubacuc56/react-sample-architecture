import { memo } from "react";
import Skeleton from "@libs/components/ui/Skeleton";
import type { SkeletonProps } from "@libs/components/ui/Skeleton";

type MediaSkeletonProps = {
	showAvatar?: boolean;
	avatarProps?: SkeletonProps;
	titleProps?: SkeletonProps;
	textProps?: SkeletonProps;
};

const MediaSkeleton = memo((props: MediaSkeletonProps) => {
	const { showAvatar = true, avatarProps, titleProps, textProps } = props;

	return (
		<div className="flex flex-auto items-center gap-2">
			{showAvatar && (
				<div>
					<Skeleton variant="circle" {...avatarProps} />
				</div>
			)}
			<div className="flex flex-col gap-4 w-full">
				<Skeleton width="40%" {...titleProps} />
				<Skeleton width="20%" {...textProps} />
			</div>
		</div>
	);
});

export default MediaSkeleton;
