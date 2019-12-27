import React from 'react';
import './sass/App.scss';
import Screen from './components/Screen';
import Button from './components/Button';
import { add, substract, multiply, divide } from './lib';

function App() {
	return (
		<div className="app">
			<div className="container">
				<Screen />
				<Button />
			</div>
		</div>
	);
}

export default App;
