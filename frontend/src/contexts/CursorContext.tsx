import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CursorModes } from '../components/Cursor';

interface CursorContextProps {
	cursorMode: CursorModes;
	setCursorMode: (cursorMode: CursorModes) => void;
};

const CursorContext = createContext<CursorContextProps>({
	cursorMode: 'auto',
	setCursorMode: () => {},
});

interface CursorContextProviderProps {
	children: ReactNode;
};

export const CursorContextProvider: React.FC<CursorContextProviderProps> = ({
	children,
}) => {
	const [cursorMode, setCursorMode] = useState<CursorModes>('auto');
	
	return (
		<CursorContext.Provider value={{
			cursorMode,
			setCursorMode,
		}}>
			{children}
		</CursorContext.Provider>
	);
};

export const useCursorContext = (): CursorContextProps => {
    const context = useContext(CursorContext);
    if (!context) throw new Error('useCursorContext must be used within a CursorContextProvider');
    return context;
};