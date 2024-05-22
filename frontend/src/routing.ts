export const setBrowserUrl = (url: string) => history.pushState(null, '', `${url}`);

export const getInitialUrl = (): string => {
	const url = window.location.href;
	const pathname = new URL(url).pathname;
	const firstPath = pathname.split('/')[1];
	const pages = ['', 'artist', 'writer', 'bio', 'contact'];
	return pages.includes(firstPath) ? pathname : '/error';
};