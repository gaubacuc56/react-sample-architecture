import { memo } from "react";
import { ToastContainer as Toast, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contextClass = {
	success: "bg-green-700",
	error: "bg-red-700",
	info: "bg-blue-700",
	warning: "bg-yellow-500",
	default: "bg-indigo-700",
};

const ToastContainer = memo((props: ToastContainerProps) => {
	const {
		position = "top-right",
		autoClose = 3000,
		hideProgressBar = true,
		theme = "colored",
		...rest
	} = props;
	return (
		<Toast
			{...rest}
			toastClassName={(context) =>
				contextClass[context?.type || "default"] +
				" relative flex p-[0.5rem] min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
			}
			bodyClassName={() =>
				"text-sm font-white font-medium p-3 flex items-center"
			}
			position={position}
			autoClose={autoClose}
			hideProgressBar={hideProgressBar}
			theme={theme}
		/>
	);
});
export default ToastContainer;
