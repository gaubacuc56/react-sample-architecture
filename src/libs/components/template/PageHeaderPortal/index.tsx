import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CommonProps } from "@app-core/@types/common";

interface IPagePortal extends CommonProps {
	container: string;
}

export const PagePortal = (props: IPagePortal) => {
	const { children, container } = props;
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted
		? ReactDOM.createPortal(children, document.getElementById(container)!)
		: null;
};
