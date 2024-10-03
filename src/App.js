import Loading from 'components/Loading/Loading';
import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const TodoPage = lazy(() => import('pages/Todo/TodoPage'));
const PomodoroPage = lazy(() => import('pages/Pomodoro/PomodoroPage'));
const GptPage = lazy(() => import('pages/Gpt/GptPage'));
const Main = lazy(() => import('pages/Main/Main'));
const Time = lazy(() => import('pages/Time/Time'));

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      ),
      children: [
        { index: true, element: <Time /> },
        { path: '/todo', element: <TodoPage /> },
        { path: '/pomodoro', element: <PomodoroPage /> },
        { path: '/gpt', element: <GptPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
