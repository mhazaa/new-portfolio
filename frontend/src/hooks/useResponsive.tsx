import { useState, useEffect } from 'react';
import globalStyles from '../theme';

const getIsMobile = () => window.innerWidth <= globalStyles.breakpoints.mobile;
const getIsTablet = () => window.innerWidth <= globalStyles.breakpoints.tablet;
const getIsDesktop = () => window.innerWidth <= globalStyles.breakpoints.desktop;

const useResponsive = () => {
	const [isMobile, setIsMobile] = useState(getIsMobile());
	const [isTablet, setIsTablet] = useState(getIsTablet());
	const [isDesktop, setIsDesktop] = useState(getIsDesktop());
    
	useEffect(() => {
		const onResize = () => {
			setIsMobile(getIsMobile());
			setIsTablet(getIsTablet());
			setIsDesktop(getIsDesktop());
		};
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);
    
	return { isMobile, isTablet, isDesktop };
};

export default useResponsive;