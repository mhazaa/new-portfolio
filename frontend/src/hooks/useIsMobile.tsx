import { useState, useEffect } from 'react';
import { globalStyles } from '../theme';

const getIsMobile = () => window.innerWidth <= globalStyles.breakpoints.mobile;

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(getIsMobile());
    
	useEffect(() => {
		const onResize = () => setIsMobile(getIsMobile());
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);
    
	return isMobile;
};

export default useIsMobile;