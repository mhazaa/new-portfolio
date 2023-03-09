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
import { Pages, AllData } from '../../types';
import { fetchAllData } from './requests';

const App: React.FC = () => {
	const [data, setData] = useState<AllData>();
	const [page, setPage] = useState<Pages>('/');
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
		//On connection might not be neccsary
		AnalyticsEngineClient.onConnection(() => AnalyticsEngineClient.sendMetric('Viewed homepage'));

		(async () => {
			const data: AllData = await fetchAllData();
			setData(data);
			console.log(data);
		})();
	}, []);

	const changePage = (page: Pages) => {
		setPage(page);
		setPost(null);
		console.log(page);
		history.pushState(null, '', `${page}`);
	};

	const changePost = (post: string | null) => {
		setPost(post);
		console.log(post);
		history.pushState(null, '', `${post}`);
	};

	return (
		<div>
			{data?.socialMediaLinks && <Header socialMediaLinks={data.socialMediaLinks} changePage={changePage} />}
			
			<div style={styles.page}>
				<CateogryNav
					page={page}
					changePage={changePage}
					variant={(isInPortfolio || page === '/') && !post ? 'primary' : 'secondary'}
				/>

				{data?.portfolio && isInPortfolio &&
					<>
						{post
							? <PostPage {...data.portfolio.writer[0]} changePage={changePage} />
							: <PortfolioNav posts={data.portfolio['writer']} changePost={changePost} />
						}
					</>
				}
			</div>

			{data?.bio && page === '/bio' &&
				<div style={styles.page}>
					<Bio bio={data.bio} />
				</div>
			}

			{page === '/contact' &&
				<div style={styles.page}>
					<Contact />
				</div>
			}

			<Background />
		</div>
	);
};

export default App;