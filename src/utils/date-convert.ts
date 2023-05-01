export const dateConvert = (
  param: Date | string,
  mask = "D-M-Y h:i"
): string => {
  let elm: Date;
  if (typeof param === "string") {
    elm = new Date(param);
  } else {
    elm = param;
  }

  const year = elm.getFullYear().toString().substring(2);
  const month = (elm.getMonth() + 1).toString();
  const date = elm.getDate().toString();
  const hour = elm.getHours().toString();
  const minute = elm.getMinutes().toString();
  const seconds = elm.getSeconds().toString();

  const par = {
    Y: (year.length > 1 ? "" : "0") + year,
    M: (month.length > 1 ? "" : "0") + month,
    D: (date.length > 1 ? "" : "0") + date,
    h: (hour.length > 1 ? "" : "0") + hour,
    i: (minute.length > 1 ? "" : "0") + minute,
    s: (seconds.length > 1 ? "" : "0") + seconds,
  };

  return mask.replace(/[\S\s]/gi, (item) => {
    if (par[item]) {
      return par[item];
    } else {
      return item;
    }
  });
};
