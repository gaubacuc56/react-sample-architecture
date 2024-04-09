import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { router } from "@app-core/routing";

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
//import 'primeicons/primeicons.css'; //icons
//import 'primeflex/primeflex.css'; // flex

function App() {
  return (
    <Suspense fallback={<ProgressSpinner />}>
      <RouterProvider router={router} fallbackElement={<ProgressSpinner />} />
    </Suspense>
  );
}

export default App;
