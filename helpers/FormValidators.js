export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export const isRequired = (value) => {
  return value != null ? undefined : "Required";
};

export const isValidEmail = (value) => {
  const email = value ? value : "ceo@screamacode.com";

  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ? undefined
    : "Invalid Email";
};

export const isValidPassword = (value) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(value)
    ? undefined
    : "Not A Strong Password";
};

export const isNumbers = (value) => {
  const number = value ? value : "1234567890";

  return /^\d+$/.test(number) ? undefined : "Not A Number";
};

export const isText = (value) => {
  return /^[A-Za-z\s]*$/.test(value) ? undefined : "Not A Text";
};

export const isMobileNumber = (value) => {
  const mobileNumber = value ? value : "1234567890";

  return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileNumber)
    ? undefined
    : "Not A Valid Mobile Number";
};

export const isValidUrl = (value) => {
  const url = value ? value : "https://google.com/";

  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(url) ? undefined : "Not A Valid Url";
};
