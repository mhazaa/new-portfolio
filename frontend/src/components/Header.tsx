import React, { CSSProperties } from 'react';
import { Pages } from '../../../types';
import Logo from './Logo';
import globalStyles from '../theme';
import instagram from '../assets/instagram.svg';
import github from '../assets/github.svg';
import spotify from '../assets/spotify.svg';
import resume from '../assets/resume.pdf';

interface HeaderProps {
	changePageUrl: (page: Pages) => void;
}

const Header: React.FC<HeaderProps> = ({
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
			margin: `${globalStyles.spacing.half} 0`,
		},
		socialMediaIcon: {
			width: '25px',
			marginRight: globalStyles.spacing.half,
		},
		logoWrapper: {
			width: '200px',
		},
	};

	const instagramOnClick = () => window.open('https://www.instagram.com/magdi_hazaa', '_blank');
	
	const githubOnClick = () => window.open('https://github.com/mhazaa', '_blank');
	
	const spotifyOnClick = () => window.open('#', '_blank');

	const bioOnClick = () => changePageUrl('/bio');
	
	const resumeOnClick = () => window.open(resume, '_blank');
	
	const contactOnClick = () => changePageUrl('/contact');
	
	const logoOnClick = () => changePageUrl('/');

	return (
		<div style={styles.container}>
			<ul style={styles.menuItems}>
				<li>
					<a onClick={bioOnClick}><h5>Bio</h5></a>
				</li>
				<li>
					<a onClick={resumeOnClick}><h5>Resumé</h5></a>
				</li>
				<li>
					<a onClick={contactOnClick}><h5>Contact</h5></a>
				</li>
			</ul>
			<div style={styles.socialMediaWrapper}>
				<a onClick={instagramOnClick}>
					<img style={styles.socialMediaIcon} src={instagram} alt='instagram' />
				</a>
				<a onClick={githubOnClick}>
					<img style={styles.socialMediaIcon} src={github} alt='github' />
				</a>
				<a onClick={spotifyOnClick}>
					<img style={styles.socialMediaIcon} src={spotify} alt='spotify' />
				</a>
			</div>
			<div style={styles.logoWrapper}>
				<Logo onClick={logoOnClick} />
			</div>
		</div>
	);
};

export default Header;