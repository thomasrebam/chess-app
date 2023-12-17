import {Dimensions, Image} from 'react-native';
import {Player} from '../../../domain/entities/Player';
import {ColoredPieceName, PieceCode} from '../../../domain/entities/PieceCode';
import styled from '@emotion/native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {PositionNumber} from '../../../domain/entities/PositionNumber';
import {getAlgebraicPositionFromAbsolutePosition} from '../../helpers/getAlgebraicPositionFromAbsolutePosition';
import {useCallback, useContext} from 'react';
import {
  getAbsolutePositionFromAlgebraicNotation,
  getAbsolutePositionFromAlgebraicPosition,
} from '../../helpers/getAbsolutePositionFromAlgebraicPosition';
import Chess from 'chess.js';
import {PlayedMovesContext} from '../../../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {usePiecePosition} from '../../hooks/usePiecePosition';
import {PlayerColorContext} from '../../contexts/PlayerColorContext';

export const PIECES: Record<ColoredPieceName, number> = {
  wk: require('../../../../../assets/images/WhiteKing.png'),
  bk: require('../../../../../assets/images/BlackKing.png'),
  wq: require('../../../../../assets/images/WhiteQueen.png'),
  bq: require('../../../../../assets/images/BlackQueen.png'),
  wb: require('../../../../../assets/images/WhiteBishop.png'),
  bb: require('../../../../../assets/images/BlackBishop.png'),
  wn: require('../../../../../assets/images/WhiteKnight.png'),
  bn: require('../../../../../assets/images/BlackKnight.png'),
  wr: require('../../../../../assets/images/WhiteRook.png'),
  br: require('../../../../../assets/images/BlackRook.png'),
  wp: require('../../../../../assets/images/WhitePawn.png'),
  bp: require('../../../../../assets/images/BlackPawn.png'),
};

interface PieceProps {
  piece: PieceCode;
  player: Player;
  position: Chess.Square;
  chess: Chess.Chess;
}

export const Piece = ({piece, player, position, chess}: PieceProps) => {
  const {addPlayedMove} = useContext(PlayedMovesContext);
  const {playerColor} = useContext(PlayerColorContext);
  const coloredPieceName: ColoredPieceName = `${player}${piece}`;

  const isGestureActive = useSharedValue(false);

  const absolutePosition = getAbsolutePositionFromAlgebraicNotation(
    position,
    playerColor,
  );
  const {offsetX, offsetY, translateX, translateY} = usePiecePosition({
    absolutePosition,
  });
  translateX.value = withTiming(absolutePosition.x, {duration: 300});
  translateY.value = withTiming(absolutePosition.y, {duration: 500});

  const animatedPieceStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: SIZE,
      height: SIZE,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
      zIndex: isGestureActive.value ? 1 : 0,
    };
  }, [translateX.value, translateY.value, playerColor]);

  const checkMovePiece = useCallback(
    (from: PositionNumber, to: PositionNumber) => {
      const {complete: completeFrom} = getAlgebraicPositionFromAbsolutePosition(
        {absolutePosition: from, playerColor},
      );
      const {
        column: fileTo,
        row: rankTo,
        complete: completeTo,
      } = getAlgebraicPositionFromAbsolutePosition({
        absolutePosition: to,
        playerColor,
      });
      const validMove = chess
        .moves({verbose: true})
        .find(move => move.from === completeFrom && move.to === completeTo);
      if (validMove !== undefined) {
        const newPos = getAbsolutePositionFromAlgebraicPosition({
          column: fileTo,
          row: rankTo,
          playerColor,
        });
        translateX.value = withTiming(newPos.x);
        translateY.value = withTiming(newPos.y, {}, () => {
          isGestureActive.value = false;
        });
        chess.move(validMove);
        addPlayedMove({
          move: chess.history()[chess.history().length - 1],
          fen: chess.fen(),
          squareTo: validMove.to,
        });
        return;
      }
      translateX.value = withTiming(from.x);
      translateY.value = withTiming(from.y, {}, () => {
        isGestureActive.value = false;
      });
    },
    [
      chess,
      translateX,
      translateY,
      isGestureActive,
      addPlayedMove,
      playerColor,
    ],
  );
  const movePiece = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isGestureActive.value = true;
    },
    onActive: event => {
      translateX.value = event.translationX + offsetX.value;
      translateY.value = event.translationY + offsetY.value;
    },
    onEnd: () => {
      const from = {x: offsetX.value, y: offsetY.value};
      const to = {x: translateX.value, y: translateY.value};
      runOnJS(checkMovePiece)(from, to);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={movePiece}>
      <Animated.View style={animatedPieceStyle}>
        <StyledImage source={PIECES[coloredPieceName]} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export const SIZE = Dimensions.get('window').width / 8;

const StyledImage = styled(Image)({
  width: SIZE,
  height: SIZE,
});
