import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import { Loader } from 'widget/Loader'
import { routeConfig } from 'shared/config/routerConfig/routerConfig'

export const AppRouter = () => (
  <Suspense fallback={<Loader/>}>
    <Routes>
      {Object.values(routeConfig).map(({path, element}) => (
        <Route key={path} path={path} element={element}/>
      ))}
    </Routes>
  </Suspense>
);

