import { createContext } from 'react';

export interface GlobalContextData {
	category: 'artist' | 'writer';
	page: 'home';
}

export const globalContext: GlobalContextData = {
	category: 'writer',
	page: 'home',
};

const GlobalContext = createContext<GlobalContextData>(globalContext);

export default GlobalContext;