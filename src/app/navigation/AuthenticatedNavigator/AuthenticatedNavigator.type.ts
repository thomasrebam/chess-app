import {MovesTree} from '../../../shared/domain/entities/MovesTree';
import {Player} from '../../../shared/domain/entities/Player';

export type AuthenticatedNavigatorStackParamList = {
  Menu: undefined;
  Analysis: {
    pgn: string | undefined;
    movesTree?: MovesTree;
    analysisName?: string;
  };
  'Testing Repertoire': {playerColor: Player; movesToTest?: MovesTree};
  'Choose Repertoire': undefined;
  'Modify Analysis': undefined;
};
