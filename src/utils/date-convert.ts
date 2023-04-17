export const dateConvert = (param) => {
  let elm = param;
  if (typeof param === "string") {
    elm = new Date(param);
  }
  const year = elm.getFullYear().toString().substring(2);
  let month = (elm.getMonth() + 1).toString();
  let date = elm.getDate().toString();
  month = (month.length > 1 ? "" : "0") + month;
  date = (date.length > 1 ? "" : "0") + date;
  return [date, month, year].join("-");
};
