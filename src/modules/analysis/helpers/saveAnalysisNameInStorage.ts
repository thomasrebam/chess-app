import {PersistentStorageService} from '../../../shared/views/services/PersistentStorageService';

interface SaveAnalysisNameProps {
  savedAnalysis: string[];
  textInputValue: string;
}

export const saveAnalysisNameInStorage = ({
  savedAnalysis,
  textInputValue,
}: SaveAnalysisNameProps) => {
  PersistentStorageService.setValue(
    'savedAnalysis',
    JSON.stringify([...savedAnalysis, textInputValue]),
  );
};
