import React, { useState, useEffect } from 'react';
import './styles/stylesheet.scss';
import Background from './components/Background';
import Footer from './components/Footer';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import BioPage from './components/BioPage';
import Contact from './components/Contact';
import Error from './components/Error';
import Loading from './components/Loading';
import PostPage from './components/PostPage';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { Pages, Post, AllData } from '../../types';
import { getAllData } from './requests';
import Page from './components/Page';

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
	const [pageUrl, setPageUrl] = useState<Pages>(initialPage);
	const [postUrl, setPostUrl] = useState<string | null>(null);
	const [post, setPost] = useState<Post | null | undefined>(null);

	useEffect(() => {
		AnalyticsEngineClient.connect();
		AnalyticsEngineClient.sendMetric('Viewed homepage');
		
		(async () => {
			const allData: AllData = await getAllData();
			seAlltData(allData);
		})();
	}, []);

	useEffect(() => {
		if (pageUrl !== '/artist' && pageUrl !== '/writer') return setPost(null);
		// @ts-ignore
		const _post: Post | undefined = allData?.portfolio[pageUrl.substring(1)].find((post: Post) => post.url === postUrl);
		setPost(_post);
	}, [postUrl]);

	const changePageUrl = (pageUrl: Pages) => {
		setPageUrl(pageUrl);
		setPostUrl(null);
		setUrl(pageUrl);
		console.log('pageUrl:', pageUrl);
	};

	const changePostUrl = (postUrl: string | null) => {
		setPostUrl(postUrl);
		if (postUrl) setUrl(pageUrl + postUrl);
		console.log('postUrl', postUrl);
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

			{!post &&
				<Footer resume={allData.resume} changePageUrl={changePageUrl} />
			}

			<Page variant={post ? 'sprawling' : 'fullscreen'}>
				<Header
					pageUrl={pageUrl}
					changePageUrl={changePageUrl}
					variant={
						(pageUrl === '/' || pageUrl === '/artist' || pageUrl === '/writer') && !post ? 'big' : 'small'
					}
				/>

				{(pageUrl === '/artist' || pageUrl === '/writer') &&
					<>
						{post
							? <PostPage {...post} changePageUrl={changePageUrl} />
							// @ts-ignore
							: <Portfolio posts={allData.portfolio[pageUrl.substring(1)]} changePostUrl={changePostUrl} />
						}
					</>
				}

				{pageUrl === '/bio' &&
					<BioPage bio={allData.bioPage.bio} image={allData.bioPage.image} />
				}

				{pageUrl === '/contact' &&
					<Contact />
				}

				{pageUrl === '/error' &&
					<Error />
				}
			</Page>
		</div>
	);
};

export default App;