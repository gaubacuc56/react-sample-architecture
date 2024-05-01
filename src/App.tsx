import { RouterProvider } from "react-router-dom";
import { router } from "@app-core/routing";
import useDarkMode from "@libs/hooks/useDarkmode";
import SuspenseLoading from "@libs/components/ui/SuspenseLoading";

function App() {
    useDarkMode();
    return (
        <>
            <RouterProvider
                router={router}
                fallbackElement={<SuspenseLoading />}
            />
        </>
    );
}

export default App;
