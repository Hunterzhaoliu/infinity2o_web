import validUrl from "valid-url";

// https://stackoverflow.com/questions/14088714/regular-expression-for-name-field-in-javascript-validation
const isValidNameRegex = /^[a-zA-Z ]{1,30}$/;
const isValidEmailRegex = /\S+@\S+\.\S+/;

export const isValidName = name => {
  return isValidNameRegex.test(name);
};

export const isValidEmail = email => {
  return isValidEmailRegex.test(email)
};

export const isValidUrl = url => {
  if (url.length > 0) {
    return validUrl.isUri(url)
  } else {
    return true;
  }
};

export const isValidAge = age => {
  const num_age = Number(age);
  // !isNaN determines if variable is a valid number
  const isNumber = !isNaN(num_age);

  if (isNumber && num_age >= 13 && num_age <= 125) {
      return true;
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
