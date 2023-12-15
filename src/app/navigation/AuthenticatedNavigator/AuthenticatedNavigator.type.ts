import {MovesTree} from '../../../shared/domain/entities/MovesTree';

export type AuthenticatedNavigatorStackParamList = {
  Menu: undefined;
  Analysis: {pgn: string | undefined};
  'Testing Repertoire': {movesToTest?: MovesTree};
  'Choose Repertoire': undefined;
  'Modify Analysis': undefined;
};
