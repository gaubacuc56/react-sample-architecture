import { RouterProvider } from "react-router-dom";
import { router } from "@app-core/routing";
import useDarkMode from "@libs/hooks/useDarkmode";
import SuspenseLoading from "@libs/components/ui/SuspenseLoading";
import Progress from "./libs/components/ui/Progress";

function App() {
    useDarkMode();
    return (
        <>
            <div className="w-screen fixed top-0 left-0 h-1 z-[9999]">
                <Progress isIndeterminate />
            </div>
            <RouterProvider
                router={router}
                fallbackElement={<SuspenseLoading />}
            />
        </>
    );
}

export default App;
