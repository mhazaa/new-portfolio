import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';

export const setBrowserUrl = (url: string) => history.pushState(null, '', `${url}`);

export const getInitialUrl = (): string => {
	const url = window.location.href;
	const pathname = new URL(url).pathname;
	const firstPath = pathname.split('/')[1];
	const pages = ['', 'artist', 'writer', 'bio', 'contact'];
	return pages.includes(firstPath) ? pathname : '/error';
};

export const openExternalUrl = (externalUrl?: string) => {
	if (!externalUrl) return;
	AnalyticsEngineClient.sendMetric(`CLICKED_ON: ${externalUrl}`);
	window.open(externalUrl, '_blank');
};