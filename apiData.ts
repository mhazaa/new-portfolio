export interface APIData {
	url: string;
	method: 'GET' | 'POST',
	data?: any,
}[];

const apiData: APIData = [
	{
		url: '/fetch-all-data',
		method: 'GET',
	},
	{
		url: '/send-like',
		method: 'POST',
	},
	{
		url: '/send-comment',
		method: 'POST',
	},
]

export default apiData