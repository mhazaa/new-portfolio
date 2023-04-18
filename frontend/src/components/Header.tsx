import React, { CSSProperties } from 'react';
import { Pages, SocialMediaLinks } from '../../../types';
import Logo from './Logo';
import instagram from '../assets/instagram.svg';
import github from '../assets/github.svg';
import spotify from '../assets/spotify.svg';
import resume from '../assets/resume.pdf';

interface HeaderProps {
	socialMediaLinks: SocialMediaLinks;
	changePage: (page: Pages) => void;
}

const Header: React.FC<HeaderProps> = ({
	socialMediaLinks,
	changePage,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			position: 'fixed',
			bottom: '10px',
			left: '10px',
			zIndex: '999',
		},
		menuItems: {
			
		},
		socialMediaWrapper: {
			margin: '5px 0',
		},
		socialMediaIcon: {
			width: '25px',
			marginRight: '5px',
		},
		logoWrapper: {
			width: '200px',
		},
	};

	const instagramOnClick = () => window.open(socialMediaLinks.instagram, '_blank');
	
	const githubOnClick = () => window.open(socialMediaLinks.instagram, '_blank');
	
	const spotifyOnClick = () => window.open(socialMediaLinks.instagram, '_blank');

	const bioOnClick = () => changePage('/bio');
	
	const resumeOnClick = () => window.open(resume, '_blank');
	
	const contactOnClick = () => changePage('/contact');
	
	const logoOnClick = () => changePage('/');

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
					<img style={styles.socialMediaIcon} src={instagram} alt='github' />
				</a>
				<a onClick={spotifyOnClick}>
					<img style={styles.socialMediaIcon} src={instagram} alt='spotify' />
				</a>
			</div>
			<div style={styles.logoWrapper}>
				<Logo onClick={logoOnClick} />
			</div>
		</div>
	);
};

export default Header;