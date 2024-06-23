import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import SuspenseLoading from "@libs/components/ui/SuspenseLoading";
import store from "@app-core/redux-manager";
import { ThemeProvider } from "@libs/provider/theme";
import "@assets/css/index.css";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ThemeProvider>
                <Suspense fallback={<SuspenseLoading />}>
                    <App />
                </Suspense>
            </ThemeProvider>
        </PersistGate>
    </Provider>
);
