import './App.css'
import { useRoutes } from 'react-router-dom';
import { routes } from './routes/routes';
import { Suspense } from 'react';

function App(){
    const routing = useRoutes(routes);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {routing}
        </Suspense>
    );
}

export default App
