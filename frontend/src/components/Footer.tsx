import React, { CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { Pages } from '../../../types';
import globalStyles from '../theme';
import instagram from '../assets/instagram.svg';
import tiktok from '../assets/tiktok.svg';
import github from '../assets/github.svg';

interface FooterProps {
	resume: string;
	changePageUrl: (page: Pages) => void;
}

const Footer: React.FC<FooterProps> = ({
	resume,
	changePageUrl,
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

	const bioOnClick = () => changePageUrl('/bio');
	
	const resumeOnClick = () => {
		AnalyticsEngineClient.sendMetric('CLICKED_ON: RESUME');
		window.open(resume, '_blank');
	};

	const contactOnClick = () => changePageUrl('/contact');

	return (
		<div style={styles.container}>
			<ul style={styles.menuItems}>
				<li>
					<a onClick={bioOnClick}><h6>Bio</h6></a>
				</li>
				<li>
					<a onClick={resumeOnClick}><h6>Resumé</h6></a>
				</li>
				<li>
					<a onClick={contactOnClick}><h6>Contact</h6></a>
				</li>
			</ul>
			<div style={styles.socialMediaWrapper}>
				<a onClick={instagramOnClick}>
					<img style={styles.socialMediaIcon} src={instagram} alt='Instagram' />
				</a>
				<a onClick={tiktokOnClick}>
					<img style={styles.socialMediaIcon} src={tiktok} alt='TikTok' />
				</a>
				<a onClick={githubOnClick}>
					<img style={styles.socialMediaIcon} src={github} alt='GitHub' />
				</a>
			</div>
		</div>
	);
};

export default Footer;