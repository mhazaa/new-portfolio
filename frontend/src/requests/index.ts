import { AllData } from '../../../types';

export const fetchAllData = async (): Promise<AllData> => {
	const response = await fetch('/fetch-all-data');
	const json = await response.json();
	return json;
};