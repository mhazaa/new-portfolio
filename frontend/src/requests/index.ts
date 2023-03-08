export const fetchAllData = async () => {
	const response = await fetch('/fetch-all-data');
	const json = await response.json();
	return json;
};