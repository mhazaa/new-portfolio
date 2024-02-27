import { useState, useEffect } from 'react';
import globalStyles from '../theme';

const getIsMobile = () => window.innerWidth <= globalStyles.breakpoints.mobile;
const getIsTablet = () => window.innerWidth <= globalStyles.breakpoints.tablet;

const useResponsive = () => {
	const [isMobile, setIsMobile] = useState(getIsMobile());
	const [isTablet, setIsTablet] = useState(getIsTablet());
    
	useEffect(() => {
		const onResize = () => {
			setIsMobile(getIsMobile());
			setIsTablet(getIsTablet());
		};
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);
    
	return { isMobile, isTablet };
};

export default useResponsive;