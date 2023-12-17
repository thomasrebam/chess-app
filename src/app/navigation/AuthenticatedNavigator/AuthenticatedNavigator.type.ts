import {MovesTree} from '../../../shared/domain/entities/MovesTree';

export type AuthenticatedNavigatorStackParamList = {
  Menu: undefined;
  Analysis: {
    pgn: string | undefined;
    movesTree?: MovesTree;
    analysisName?: string;
  };
  'Testing Repertoire': {movesToTest?: MovesTree};
  'Choose Repertoire': undefined;
  'Modify Analysis': undefined;
};
