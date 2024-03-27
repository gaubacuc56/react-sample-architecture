import { useRoutes } from 'react-router-dom';

import { AppRoutes } from '@/app-core/routing';

function App() {
	const router = useRoutes(AppRoutes());
  return (
    <>
      {router}
    </>
  );
}

export default App;
