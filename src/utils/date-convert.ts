export const dateConvert = (param, mask = "D-M-Y h:i") => {
  let elm = param;
  if (typeof param === "string") {
    elm = new Date(param);
  }

  const nowSec = Date.now() / 1000;
  const targetSec = Date.parse(elm) / 1000;

  let year = elm.getFullYear().toString().substring(2);
  let month = (elm.getMonth() + 1).toString();
  let date = elm.getDate().toString();
  let hour = elm.getHours().toString();
  let minute = elm.getMinutes().toString();
  let seconds = elm.getSeconds().toString();

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
