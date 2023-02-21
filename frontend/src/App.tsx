import React from 'react';
import './styles/stylesheet.scss';
import Header from './components/Header';
import Background from './components/Background';
import CateogryNav from './components/CateogryNav';
import PortfolioNav from './components/PortfolioNav';
import GlobalContext, { globalContext } from './GlobalContext';
import content from '../../content.json';

const App: React.FC = () => {
	return (
		<GlobalContext.Provider value={globalContext}>
			<div>
				<Header />
				<CateogryNav />
				<PortfolioNav portfolioItems={content.portfolioItems.artist} />
				<Background />
			</div>
		</GlobalContext.Provider>
	);
};

export default App;