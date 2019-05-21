export const replaceMatches = (
  src: string,
  boundBegin: string,
  boundEnd: string,
  data: any
) => {
  const expr = new RegExp(`${boundBegin}.+${boundEnd}`, 'g');
  let res = src;
  const tokens = res.match(expr) || [];
  for (const token of tokens) {
    let re = new RegExp(`[${boundBegin}${boundEnd}]`, 'g');
    const key = token.replace(re, '');
    re = new RegExp(token, 'g');
    res = res.replace(re, data[key]);
  }
  return res;
};
