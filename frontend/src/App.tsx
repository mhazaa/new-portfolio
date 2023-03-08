import React, { useState, useEffect, CSSProperties } from 'react';
import './styles/stylesheet.scss';
import Header from './components/Header';
import Background from './components/Background';
import CateogryNav from './components/CateogryNav';
import PortfolioNav from './components/PortfolioNav';
import Bio from './components/Bio';
import Contact from './components/Contact';
import PostPage from './components/PostPage';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { Pages, Categories, AllData } from '../../types';
import { fetchAllData } from './requests';

const App: React.FC = () => {
	const [data, setData] = useState<AllData>();
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
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.connect();
		//On connection might not be neccsary
		AnalyticsEngineClient.onConnection(() => AnalyticsEngineClient.sendMetric('Viewed homepage'));

		(async () => {
			const data = await fetchAllData();
			setData(data);
			console.log(data);
			console.log(data.portfolio.writer[0]);
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

	const inHomepage = page === '' || page === 'home';

	return (
		<div>
			{data && <Header socialMediaLinks={data.socialMediaLinks} changePage={changePage} />}
			
			{data &&
				<div style={styles.page}>
					<CateogryNav
						category={category}
						changeCategory={changeCategory}
						variant={inHomepage ? 'primary' : 'secondary'}
					/>
					{inHomepage && <PortfolioNav posts={data.portfolio[category]} changePage={changePage} />}
				</div>
			}

			{data && page === 'bio' &&
				<div style={styles.page}>
					<Bio bio={data.bio} />
				</div>
			}

			{page === 'contact' &&
				<div style={styles.page}>
					<Contact />
				</div>
			}

			{data && category === 'artist' || category === 'writer' &&
				<div style={styles.page}>
					<PostPage {...data!.portfolio.artist[0]} changePage={changePage} />
				</div>
			}

			<Background />
		</div>
	);
};

export default App;