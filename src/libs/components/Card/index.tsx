import { useMemo } from "react";
import classNames from "classnames";

import { CommonProps } from "@app-core/@types/common";

interface ICardProps extends CommonProps {}

export default function Card(props: ICardProps) {
  const { className, children } = props;

  const _cls = useMemo(() => {
    return classNames(
        "!z-5 relative rounded-lg bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none"
        , className && className);
  }, [className]);

  return <div className={_cls}>{children}</div>;
}
