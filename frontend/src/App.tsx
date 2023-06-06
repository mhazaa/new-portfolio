import React, { useState, useEffect } from 'react';
import './styles/stylesheet.scss';
import Background from './components/Background';
import Header from './components/Header';
import CateogryNav from './components/CateogryNav';
import PortfolioNav from './components/PortfolioNav';
import Bio from './components/Bio';
import Contact from './components/Contact';
import Error from './components/Error';
import Loading from './components/Loading';
import PostPage from './components/PostPage';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { Pages, AllData } from '../../types';
import { getAllData } from './requests';
import Page from './components/Page';
import Logo from './components/Logo';

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

	const portfolioPage = (): 'artist' | 'writer' => {
		if (page === '/artist') return 'artist';
		if (page === '/writer') return 'writer';
		return 'artist';
	};

	if (!allData) return (
		<div>
			<Background />

			<Page>
				<Loading />
			</Page>
		</div>
	);

	return (
		<div>
			<Background />
			
			<Page zIndex={'1'} variant={page === '/' ? 'fullscreen' : 'header'}>
				{page === '/' && <Logo />}
				<CateogryNav
					page={page}
					changePage={changePage}
					variant={
						(page === '/' || page === '/artist' || page === '/writer') && !post ? 'big' : 'small'
					}
				/>
			</Page>

			{(page === '/artist' || page === '/writer') &&
				<>
					{post
						?
						<Page variant={'sprawling'}>
							<PostPage {...allData.portfolio.artist[0]} changePage={changePage} />
						</Page>
						:
						<Page>
							<PortfolioNav posts={allData.portfolio[portfolioPage()]} changePost={changePost} />
						</Page>
					}
				</>
			}

			{page === '/bio' &&
				<Page>
					<Bio bio={allData.bioPage.bio} />
				</Page>
			}

			{page === '/contact' &&
				<Page>
					<Contact />
				</Page>
			}

			{page === '/error' &&
				<Page>
					<Error />
				</Page>
			}

			<Header socialMediaLinks={allData.socialMediaLinks} changePage={changePage} />
		</div>
	);
};

export default App;