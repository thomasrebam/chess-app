import {createContext, useState} from 'react';

export type SavedAnalysis = string[];

interface SavedAnalysisContextProps {
  savedAnalysis: SavedAnalysis;
  addSavedAnalysis: ({newAnalysis}: {newAnalysis: string}) => void;
  setSavedAnalysis: ({analysis}: {analysis: string[]}) => void;
}

export const SavedAnalysisContext = createContext<SavedAnalysisContextProps>({
  savedAnalysis: [],
  // eslint-disable-next-line unused-imports/no-unused-vars
  addSavedAnalysis: ({newAnalysis}: {newAnalysis: string}) => {},
  // eslint-disable-next-line unused-imports/no-unused-vars
  setSavedAnalysis: ({analysis}: {analysis: string[]}) => {},
});

interface SavedAnalysisProviderProps {
  children: React.ReactNode;
  savedAnalysis?: SavedAnalysis;
}

export const SavedAnalysisProvider = ({
  children,
  savedAnalysis,
}: SavedAnalysisProviderProps) => {
  const initialAnalysis: SavedAnalysis = savedAnalysis ? savedAnalysis : [];
  const [currentSavedAnalysis, setCurrentSavedAnalysis] =
    useState<SavedAnalysis>(initialAnalysis);

  const addSavedAnalysis = ({newAnalysis}: {newAnalysis: string}) => {
    setCurrentSavedAnalysis([...currentSavedAnalysis, newAnalysis]);
  };
  const setSavedAnalysis = ({analysis}: {analysis: string[]}) => {
    setCurrentSavedAnalysis(analysis);
  };
  const providerValue: SavedAnalysisContextProps = {
    savedAnalysis: currentSavedAnalysis,
    addSavedAnalysis,
    setSavedAnalysis,
  };
  return (
    <SavedAnalysisContext.Provider value={providerValue}>
      {children}
    </SavedAnalysisContext.Provider>
  );
};
