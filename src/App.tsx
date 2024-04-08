import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { router } from "@app-core/routing";
function App() {
  return (
    <Suspense fallback={<ProgressSpinner />}>
      <RouterProvider router={router} fallbackElement={<ProgressSpinner />} />
    </Suspense>
  );
}

export default App;
