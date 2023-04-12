const helperDateConvert = (param) => {
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

const helperIfeq = (a, b, options) => {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
};

const helperIfnoteq = (a, b, options) => {
  if (a !== b) {
    return options.fn(this);
  }
  return options.inverse(this);
};

const registerHelpers = (hbs) => {
  hbs.registerHelper("dateConvert", helperDateConvert);
  hbs.registerHelper("ifeq", helperIfeq);
  hbs.registerHelper("ifnoteq", helperIfnoteq);
};

module.exports = { registerHelpers };
