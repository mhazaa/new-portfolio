import React, { useState, useEffect, CSSProperties } from 'react';
import './styles/stylesheet.scss';
import Header from './components/Header';
import Background from './components/Background';
import CateogryNav from './components/CateogryNav';
import PortfolioNav from './components/PortfolioNav';
import Bio from './components/Bio';
import Contact from './components/Contact';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { Pages, Categories } from '../../types';
import { fetchAllData } from './requests';
import data from '../../data';

const App: React.FC = () => {
	const [page, setPage] = useState<Pages>('');
	const [category, setCategory] = useState<Categories>('artist');

	const styles: {
		[key: string]: CSSProperties;
	} = {
		page: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			width: '70%',
			maxWidth: '800px',
			margin: 'auto',
			minHeight: '100vh',
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.connect();
		//On connection might not be neccsary
		AnalyticsEngineClient.onConnection(() => AnalyticsEngineClient.sendMetric('Viewed homepage'));

		(async () => {
			const data = await fetchAllData();
			console.log(data);
		})();
	}, []);

	const changePage = (page: Pages) => {
		setPage(page);
		console.log(page);
	};

	const changeCategory = (category: Categories) => {
		changePage('');
		setCategory(category);
		console.log(category);
	};

	return (
		<div>
			<Header socialMediaLinks={data.socialMediaLinks} changePage={changePage} />
			
			{(page === '' || page === 'home') &&
				<div style={styles.page}>
					<CateogryNav category={category} changeCategory={changeCategory} />
					<PortfolioNav posts={data.portfolio[category]} changePage={changePage} />
				</div>
			}

			{page === 'bio' &&
				<div style={styles.page}>
					<Bio bio={data.bio} />
				</div>
			}

			{page === 'contact' &&
				<div style={styles.page}>
					<Contact />
				</div>
			}

			<Background />
		</div>
	);
};

export default App;