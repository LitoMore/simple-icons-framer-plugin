import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import 'framer-plugin/framer.css';

const root = document.querySelector('#root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
