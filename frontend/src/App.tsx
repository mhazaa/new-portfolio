import React, { useState, useEffect } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { getAllData } from './requests';
import { setBrowserUrl, getInitialUrl } from './routing';
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
import { Post, AllData, Categories } from '../../types';
import './styles/stylesheet.scss';

const initialUrl = getInitialUrl();
setBrowserUrl(initialUrl);

const App: React.FC = () => {
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
	}, []);

	useEffect(() => {
		setPost(null);
		setBrowserUrl(url);
		console.log('url:', url);

		const isWriterOrArtistUrl = ( url.includes('/artist') && url !== '/artist' ||  url.includes('/writer') && url !== '/writer');
		if (!isWriterOrArtistUrl) return;

		const category: Categories = url.split('/')[1] as Categories;
		
		const _post: Post | undefined =
			allData?.portfolio[category].find((post: Post) => post.internalUrl === url);
		(_post) ? setPost(_post) : setUrl('/error');
	}, [url]);

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
				<Footer resume={allData.resume} setUrl={setUrl} />
			}

			<Page variant={post ? 'sprawling' : 'fullscreen'}>
				{(url === '/' || url === '/artist' || url === '/writer') ? (
					<Header
						url={url}
						setUrl={setUrl}
						variant='big'
					/>
				) : (
					<Header
						url={url}
						setUrl={setUrl}
						variant='small'
					/>
				)}

				{(url === '/artist' || url === '/writer') &&
					<Portfolio
						posts={allData.portfolio[url.substring(1) as Categories]}
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
	);
};

export default App;