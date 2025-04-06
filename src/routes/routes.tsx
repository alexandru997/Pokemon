import {RouteObject} from 'react-router-dom'
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Detail = lazy(() => import('../pages/Detail'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/:name',
        element: <Detail />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]
