import { RouterProvider } from "react-router-dom";

import { router } from "@app-core/routing";
import useDarkMode from "@libs/hooks/useDarkmode";
import SuspenseLoading from "@libs/components/ui/SuspenseLoading";
import ToastContainer from "@libs/components/ui/ToastContainer";

function App() {
    useDarkMode();
    return (
        <>
            <ToastContainer />
            <RouterProvider
                router={router}
                fallbackElement={<SuspenseLoading />}
            />
        </>
    );
}

export default App;
