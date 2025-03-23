import React, { useState, useEffect } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { getAllData } from './requests';
import { setBrowserUrl, getUrl, getInitialUrl, isPostUrl, getCategory } from './routing';
import useResponsive from './hooks/useResponsive';
import { CursorContextProvider } from './contexts/CursorContext';
import Page from './components/Page';
import Background from './components/Background';
import Footer from './components/Footer';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import BioPage from './components/BioPage';
import Contact from './components/Contact';
import Error from './components/Error';
import Loading from './components/Loading';
import PostPage from './components/PostPage';
import Cursor from './components/Cursor';
import { Post, AllData, Categories } from '../../types';
import './styles/stylesheet.scss';

const initialUrl = getInitialUrl();
setBrowserUrl(initialUrl);

const App: React.FC = () => {
	const { isTablet } = useResponsive();
	const [allData, seAlltData] = useState<AllData>();
	const [url, setUrl] = useState<string>(initialUrl);
	const [post, setPost] = useState<Post | null>(null);

	useEffect(() => {
		AnalyticsEngineClient.connect();
		if (url === '/') AnalyticsEngineClient.sendMetric('VIEWED_HOMEPAGE');
		
		(async () => {
			const allData: AllData = await getAllData();
			seAlltData(allData);
		})();

		window.addEventListener('popstate', () => setUrl(getUrl()));
	}, []);

	useEffect(() => {
		setPost(null);
		setBrowserUrl(url);
		console.log('url:', url);
		
		if (!isPostUrl()) return;

		const category: Categories | false = getCategory();

		if (!allData || !category) return;
		
		const _post: Post | undefined =
			allData?.portfolio[category].find((post: Post) => post.internalUrl === url);
		
		(_post) ? setPost(_post) : setUrl('/error');
	}, [url, allData]);

	if (!allData) return (
		<div>
			<Cursor />
			
			<Background />

			<Page variant='fullscreen'>
				<Loading />
			</Page>
		</div>
	);

	const headerVariant = () => (
		url === '/' ||
		(url === '/artist' && !isTablet) ||
		(url === '/writer' && !isTablet)
			? 'big'
			: 'small'
	);

	return (
		<CursorContextProvider>
			<div>
				<Cursor />
				
				<Background />

				{!post &&
					<Footer resume={allData.resume} url={url} setUrl={setUrl} />
				}

				<Page variant={post ? 'sprawling' : 'fullscreen'}>
					<Header
						url={url}
						setUrl={setUrl}
						variant={headerVariant()}
					/>

					{(url === '/artist' || url === '/writer') &&
						<Portfolio
							posts={allData.portfolio[url.substring(1) as Categories]}
							showScrollbar={false}
							setUrl={setUrl}
						/>
					}

					{post &&
						<PostPage 
							{...post}
							setUrl={setUrl}
						/> 
					}

					{url === '/bio' &&
						<BioPage
							bio={allData.bioPage.bio}
							image={allData.bioPage.image}
						/>
					}

					{url === '/contact' &&
						<Contact setUrl={setUrl} />
					}

					{url === '/error' &&
						<Error />
					}
				</Page>
			</div>
		</CursorContextProvider>
	);
};

export default App;