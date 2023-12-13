import {createContext, useState} from 'react';

type SavedAnalysis = string[];

interface SavedAnalysisContextProps {
  savedAnalysis: SavedAnalysis;
  addSavedAnalysis: ({newAnalysis}: {newAnalysis: string}) => void;
}

export const SavedAnalysisContext = createContext<SavedAnalysisContextProps>({
  savedAnalysis: [],
  // eslint-disable-next-line unused-imports/no-unused-vars
  addSavedAnalysis: ({newAnalysis}: {newAnalysis: string}) => {},
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
  const providerValue: SavedAnalysisContextProps = {
    savedAnalysis: currentSavedAnalysis,
    addSavedAnalysis,
  };
  return (
    <SavedAnalysisContext.Provider value={providerValue}>
      {children}
    </SavedAnalysisContext.Provider>
  );
};
