import React, { CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { Pointer } from './Cursor';
import { globalStyles } from '../theme';
import instagram from '../assets/instagram.svg';
import tiktok from '../assets/tiktok.svg';
import github from '../assets/github.svg';

interface FooterProps {
	resume: string;
	url: string;
	setUrl: (url: string) => void;
};

const Footer: React.FC<FooterProps> = ({
	resume,
	url,
	setUrl,
}) => {
	const isBioUrl = url === '/bio';
	const isContactrUrl = url === '/contact';
	
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
			display: 'inline-block',
		},
		socialMediaWrapper: {
			marginTop: globalStyles.spacing.half,
		},
		socialMediaIconWrapper: {
			display: 'inline-block',
			marginRight: globalStyles.spacing.half,
		},
		socialMediaIcon: {
			height: '25px',
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
						className={`clickable translateLineHover ${isBioUrl ? 'translateLineHoverActive' : ''}`}
						onClick={bioOnClick}
					>
						<Pointer>
							<h6 className='unselectable'>Bio</h6>
						</Pointer>
					</a>
				</li>
				<li>
					<a
						style={styles.menuItem}
						className='clickable translateLineHover'
						onClick={resumeOnClick}
					>
						<Pointer>
							<h6 className='unselectable'>Resume</h6>
						</Pointer>
					</a>
				</li>
				<li>
					<a
						style={styles.menuItem}
						className={`clickable translateLineHover ${isContactrUrl ? 'translateLineHoverActive' : ''}`}
						onClick={contactOnClick}
					>
						<Pointer>
							<h6 className='unselectable'>Contact</h6>
						</Pointer>
					</a>
				</li>
			</ul>
			<div style={styles.socialMediaWrapper}>
				<a
					style={styles.socialMediaIconWrapper}
					className='clickable scaleHover'
					onClick={instagramOnClick}
				>
					<Pointer>
						<img style={styles.socialMediaIcon} src={instagram} alt='Instagram' />
					</Pointer>
				</a>
				<a
					style={styles.socialMediaIconWrapper}
					className='clickable scaleHover'
					onClick={tiktokOnClick}
				>
					<Pointer>
						<img style={styles.socialMediaIcon} src={tiktok} alt='TikTok' />
					</Pointer>
				</a>
				<a
					style={styles.socialMediaIconWrapper}
					className='clickable scaleHover'
					onClick={githubOnClick}
				>
					<Pointer>
						<img style={styles.socialMediaIcon} src={github} alt='GitHub' />
					</Pointer>
				</a>
			</div>
		</div>
	);
};

export default Footer;