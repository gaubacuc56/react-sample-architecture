import appLogo from "@assets/img/logo.png";

export default function SuspenseLoading() {
	return (
		<div className="w-[100vw] h-[100vh] flex items-center justify-center">
			<img className="w-11 spin-360" src={appLogo} />
		</div>
	);
}
