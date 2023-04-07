import React, { useState, useEffect, CSSProperties } from 'react';
import './styles/stylesheet.scss';
import Header from './components/Header';
import Background from './components/Background';
import CateogryNav from './components/CateogryNav';
import PortfolioNav from './components/PortfolioNav';
import Bio from './components/Bio';
import Contact from './components/Contact';
import Error from './components/Error';
import PostPage from './components/PostPage';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { Pages, AllData } from '../../types';
import { getAllData } from './requests';

const setUrl = (url: string) => history.pushState(null, '', `${url}`);
const url = window.location.href;
const pathname = new URL(url).pathname;

const initialPage: Pages = 
	(
		pathname === '/' ||
		pathname === '/artist' ||
		pathname === '/writer' ||
		pathname === '/bio' ||
		pathname === '/resume' ||
		pathname === '/contact'
	)
		? pathname
		: '/error';

setUrl(initialPage);

const App: React.FC = () => {
	const [allData, seAlltData] = useState<AllData>();
	const [page, setPage] = useState<Pages>(initialPage);
	const [post, setPost] = useState<string | null>(null);
	const isInPortfolio = (page === '/artist' || page === '/writer');

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
		AnalyticsEngineClient.sendMetric('Viewed homepage');
		
		(async () => {
			const allData: AllData = await getAllData();
			seAlltData(allData);
		})();
	}, []);

	const changePage = (page: Pages) => {
		setPage(page);
		setPost(null);
		setUrl(page);
		console.log(page);
	};

	const changePost = (post: string | null) => {
		setPost(post);
		if (post) setUrl(post);
		console.log(post);
	};

	return (
		<div>
			{allData?.socialMediaLinks && <Header socialMediaLinks={allData.socialMediaLinks} changePage={changePage} />}
			
			<div style={styles.page}>
				<CateogryNav
					page={page}
					changePage={changePage}
					variant={(isInPortfolio || page === '/') && !post ? 'primary' : 'secondary'}
				/>

				{allData?.portfolio && isInPortfolio &&
					<>
						{post
							? <PostPage {...allData.portfolio.artist[0]} changePage={changePage} />
							: <PortfolioNav posts={allData.portfolio['artist']} changePost={changePost} />
						}
					</>
				}
			</div>

			{allData?.bioPage && page === '/bio' &&
				<div style={styles.page}>
					<Bio bio={allData.bioPage.bio} />
				</div>
			}

			{page === '/contact' &&
				<div style={styles.page}>
					<Contact />
				</div>
			}

			{page === '/error' &&
				<div style={styles.page}>
					<Error />
				</div>
			}

			<Background />
		</div>
	);
};

export default App;