import React from 'react';
import ReactDOM from 'react-dom/client';
import ExercisePlan from './pages/ExercisePlan/ExercisePlan';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login/Login';
import Menu from './components/Menu';
import ProfilePage from './pages/Profile/ProfilePage';
import Inscription from './pages/Inscription/Inscription';
import ProgressChart from './pages/Profile/components/ProgressChart';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Menu />,
		children: [
			{
				path: 'exercise',
				element: <ExercisePlan />,
			},
			{
				path: 'profile',
				element: <ProfilePage />,
			},
			{
				path: 'progresschart',
				element: <ProgressChart />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/inscription',
		element: <Inscription />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
