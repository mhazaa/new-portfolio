import React, { CSSProperties } from 'react';
import { Pages, SocialMediaLinks } from '../../../types';
import { globalStyles } from '../theme';
import instagram from '../assets/instagram.svg';
import logo from '../assets/logo.svg';
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
		},
		instagram: {
			width: '25px',
			fill: globalStyles.colors.brownPrimary,
		},
		menuItems: {
			margin: '5px 0',
		},
		logoWrapper: {
			display: 'flex',
			width: '200px',
		},
		logoHiddenText: {
			position: 'absolute',
			textIndent: '-999999999px',
		},
		logoObject: {
			fill: globalStyles.colors.brownPrimary,
		}
	};

	const instagramOnClick = () => window.open(socialMediaLinks.instagram, '_blank');

	const bioOnClick = () => changePage('bio');

	const resumeOnClick = () => window.open(resume, '_blank');

	const contactOnClick = () => changePage('contact');

	const logoOnClick = () => changePage('');

	return (
		<div style={styles.container}>
			<a onClick={instagramOnClick}><img style={styles.instagram} src={instagram} alt='instagram' /></a>
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
			<a style={styles.logoWrapper} onClick={logoOnClick}>
				<h1 style={styles.logoHiddenText}>
					Magdi Hazaa
				</h1>
				<img style={styles.logoObject} src={logo} alt='magdi hazaa' />
			</a>
		</div>
	);
};

export default Header;