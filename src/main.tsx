import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { PrimeReactProvider } from "primereact/api";

import App from "./App";
import SuspenseLoading from "./components/SuspenseLoading";
import store from "./app-core/redux-manager";
import "./index.css";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <Suspense fallback={<SuspenseLoading />}>
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
        </Suspense>
    </PersistGate>
  </Provider>
);
