import React, { CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { globalStyles } from '../theme';
import instagram from '../assets/instagram.svg';
import tiktok from '../assets/tiktok.svg';
import github from '../assets/github.svg';

interface FooterProps {
	resume: string;
	setUrl: (url: string) => void;
};

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
		menuItem: {
			display: 'block',
		},
		socialMediaWrapper: {
			marginTop: globalStyles.spacing.half,
		},
		socialMediaIconWrapper: {
			display: 'inline-block',
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
					<a
						style={styles.menuItem}
						className='clickable translateLineHover'
						onClick={bioOnClick}
					>
						<h6>Bio</h6>
					</a>
				</li>
				<li>
					<a
						style={styles.menuItem}
						className='clickable translateLineHover'
						onClick={resumeOnClick}
					>
						<h6>Resume</h6>
					</a>
				</li>
				<li>
					<a
						style={styles.menuItem}
						className='clickable translateLineHover'
						onClick={contactOnClick}
					>
						<h6>Contact</h6>
					</a>
				</li>
			</ul>
			<div style={styles.socialMediaWrapper}>
				<a
					style={styles.socialMediaIconWrapper}
					className='clickable scaleHover'
					onClick={instagramOnClick}
				>
					<img style={styles.socialMediaIcon} src={instagram} alt='Instagram' />
				</a>
				<a
					style={styles.socialMediaIconWrapper}
					className='clickable scaleHover'
					onClick={tiktokOnClick}
				>
					<img style={styles.socialMediaIcon} src={tiktok} alt='TikTok' />
				</a>
				<a
					style={styles.socialMediaIconWrapper}
					className='clickable scaleHover'
					onClick={githubOnClick}
				>
					<img style={styles.socialMediaIcon} src={github} alt='GitHub' />
				</a>
			</div>
		</div>
	);
};

export default Footer;