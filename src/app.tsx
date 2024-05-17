import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Provider from "./context";

import NoPage from '@/pages/404';
import Loading from '@/components/loading';
import useSocket from '@/context/use-socket';
import Staking from './pages/staking';
import Home from './pages';

function App() {
	const location = useLocation();

	const { loading, showLoading } = useSocket();

	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (location.pathname === '/') {
			showLoading(true);
			setTimeout(() => {
				showLoading(false);
			},);
		}
	}, [location]);

	return (
		<>
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="/staking" element={<Staking />} />
					<Route path="*" element={<NoPage />} />
				</Route>
			</Routes>
			<Loading show={loading} />
			<ToastContainer />
			<NotificationContainer />
		</>
	);
}

export default App;