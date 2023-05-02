export const mediaTimeConvert = (time: number): string => {
  let result = "";
  const minutes: number = Math.floor(time / 60);
  const seconds: number = Math.floor(time - minutes * 60);
  result += minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  result += ":";
  result += seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  return result;
};
