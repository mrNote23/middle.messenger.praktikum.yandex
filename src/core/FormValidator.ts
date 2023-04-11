export class FormValidator {
  constructor(props) {}

  event = <T>(e: T) => {
    e.preventDefault();
    const fieldName = e.target.name;
    const fieldTarget = e.target.form[fieldName];
    fieldTarget.value = "hello";
    console.log(fieldName);
  };
}
