import React, { CSSProperties } from 'react';
import instagram from '../assets/instagram.svg';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			position: 'fixed',
			bottom: '10px',
			left: '10px',
		},
		instagram: {
			width: '30px',
			margin: '5px 0',
		},
		logo: {
			display: 'flex',
			width: '200px',
		},
		logoText: {
			position: 'absolute',
			textIndent: '-999999999px',
		}
	};

	const bioOnClick = () => {
		console.log('bio on click');
	};

	const resumeOnClick = () => {
		console.log('resume on click');
	};

	const contactOnClick = () => {
		console.log('contact on click');
	};

	const logoOnClick = () => {
		console.log('logo on click');
	};

	return (
		<div style={styles.container}>
			<ul>
				<li>
					<a onClick={bioOnClick}><h5>Bio</h5></a>
				</li>
				<li>
					<a onClick={resumeOnClick}><h5>Resumé</h5></a>
				</li>
				<li>
					<a onClick={contactOnClick}><h5>Contact</h5></a>
				</li>
				<li>
					<a><img style={styles.instagram} src={instagram} alt='instagram' /></a>
				</li>
			</ul>
			<a style={styles.logo} onClick={logoOnClick}>
				<h1 style={styles.logoText}>
					Magdi Hazaa
				</h1>
				<img src={logo} alt='magdi hazaa' />
			</a>
		</div>
	);
};

export default Header;