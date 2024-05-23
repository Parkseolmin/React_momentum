import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TodoPage from 'pages/Todo/TodoPage';
import PomodoroPage from 'pages/Pomodoro/PomodoroPage';
import GptPage from 'pages/Gpt/GptPage';
import Main from 'pages/Main/Main';
import Time from 'pages/Time/Time';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
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
