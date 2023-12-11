export const keyGenerator = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const rand = (min = 0, max = 1000) =>
    Math.floor(Math.random() * (max - min) + min);
  const randChar = (length = 6) => {
    const randchars = [];
    for (let i = 0; i < length; i++) {
      randchars.push(chars[rand(0, chars.length)]);
    }
    return randchars.join('');
  };
  return randChar();
};
