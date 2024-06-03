import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { Pages, Categories } from '../../types';

export const setBrowserUrl = (url: string) => history.pushState(null, '', `${url}`);

const getUrl = (): string => {
	const fullUrl = window.location.href;
	const url = new URL(fullUrl).pathname;
	return url;
};

const validUrl = (): string | false => {
	const url = getUrl();
	const pages: Pages[] = ['/', '/artist', '/writer', '/bio', '/contact'];
	const isMainUrl: boolean = pages.some(page => page === url);
	return (isMainUrl || isPostUrl()) ? url : false;
};

export const getInitialUrl = (): string => {
	const _validUrl = validUrl();
	return _validUrl ? _validUrl : '/error';
};

export const isPostUrl = (): boolean => {
	const url = getUrl();
	const isPostUrl = (
		url.includes('/artist') &&
		url !== '/artist' ||
		url.includes('/writer') &&
		url !== '/writer'
	);
	return isPostUrl;
};

export const getCategory = (): Categories | false => {
	if (!isPostUrl()) return false;
	const url = getUrl();
	return url.split('/')[1] as Categories;
};

export const openExternalUrl = (externalUrl?: string) => {
	if (!externalUrl) return;
	AnalyticsEngineClient.sendMetric(`CLICKED_ON: ${externalUrl}`);
	window.open(externalUrl, '_blank');
};