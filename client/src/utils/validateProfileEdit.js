import validUrl from "valid-url";

// https://stackoverflow.com/questions/14088714/regular-expression-for-name-field-in-javascript-validation
const isValidNameRegex = /^[a-zA-Z ]{1,30}$/;
const isValidEmailRegex = /\S+@\S+\.\S+/;

export const isValidName = name => {
  const isValidName = isValidNameRegex.test(name) === true;

  if (isValidName) {
    return true;
  } else {
    return false;
  }
};

export const isValidEmail = email => {
  const isValidEmail = isValidEmailRegex.test(email) === true;

  if (isValidEmail) {
    return true;
  } else {
    return false;
  }
};

export const isValidUrl = url => {
  if (validUrl.isUri(url)) {
    return true;
  } else {
    return false;
  }
};

export const isValidAge = age => {
  const num_age = Number(age);
  const isNumber = !isNaN(num_age);

  if (isNumber) {
    if (num_age >= 13 && num_age <= 125) {
      return true;
    }
  }

  return false;
};

export const isValidInterests = interests => {
  if (interests !== undefined) {
    if (interests.length >= 1 && interests.length <= 5) {
      return true;
    }
  }

  return false;
};

export const isValidTimeZone = timeZone => {
  const validTimeZoneCountries = [
    "europe",
    "canada",
    "united_states",
    "asia",
    "africa"
  ];
  const indexOfTimeZone = validTimeZoneCountries.indexOf(timeZone[0]);
  if (timeZone !== undefined && indexOfTimeZone !== -1) {
    return true;
  }

  return false;
};
