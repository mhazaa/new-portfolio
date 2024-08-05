import React, { CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import globalStyles from '../theme';
import instagram from '../assets/instagram.svg';
import tiktok from '../assets/tiktok.svg';
import github from '../assets/github.svg';

interface FooterProps {
	resume: string;
	setUrl: (url: string) => void;
}

const Footer: React.FC<FooterProps> = ({
	resume,
	setUrl,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			position: 'fixed',
			bottom: globalStyles.spacing.standard,
			left: globalStyles.spacing.standard,
			zIndex: '999',
		},
		menuItems: {
			
		},
		socialMediaWrapper: {
			marginTop: globalStyles.spacing.half,
		},
		socialMediaIcon: {
			height: '25px',
			marginRight: globalStyles.spacing.half,
		},
	};

	const instagramOnClick = () => {
		AnalyticsEngineClient.sendMetric('CLICKED_ON: INSTAGRAM');
		window.open('https://www.instagram.com/magdi_hazaa', '_blank');
	};
	
	const tiktokOnClick = () => {
		AnalyticsEngineClient.sendMetric('CLICKED_ON: TIKTOK');
		window.open('https://www.tiktok.com/@magsartzone', '_blank');
	};

	const githubOnClick = () => {
		AnalyticsEngineClient.sendMetric('CLICKED_ON: GITHUB');
		window.open('https://github.com/mhazaa', '_blank');
	};

	const bioOnClick = () => setUrl('/bio');
	
	const resumeOnClick = () => {
		AnalyticsEngineClient.sendMetric('CLICKED_ON: RESUME');
		window.open(resume, '_blank');
	};

	const contactOnClick = () => setUrl('/contact');

	return (
		<div style={styles.container}>
			<ul style={styles.menuItems}>
				<li>
					<a className='clickable' onClick={bioOnClick}><h6>Bio</h6></a>
				</li>
				<li>
					<a className='clickable' onClick={resumeOnClick}><h6>Resumé</h6></a>
				</li>
				<li>
					<a className='clickable' onClick={contactOnClick}><h6>Contact</h6></a>
				</li>
			</ul>
			<div style={styles.socialMediaWrapper}>
				<a className='clickable' onClick={instagramOnClick}>
					<img style={styles.socialMediaIcon} src={instagram} alt='Instagram' />
				</a>
				<a className='clickable' onClick={tiktokOnClick}>
					<img style={styles.socialMediaIcon} src={tiktok} alt='TikTok' />
				</a>
				<a className='clickable' onClick={githubOnClick}>
					<img style={styles.socialMediaIcon} src={github} alt='GitHub' />
				</a>
			</div>
		</div>
	);
};

export default Footer;