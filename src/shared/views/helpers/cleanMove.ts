export const cleanMove = (move: string) => {
  if (move.includes('.')) {
    return move.split('. ')[1];
  } else {
    return move.split(' ')[1];
  }
};
