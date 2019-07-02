// Dictionaries:
const zero = "zero";
const ones = {
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine"
};

const teens = {
  "1": "eleven",
  "2": "twelve",
  "3": "thirteen",
  "4": "fourteen",
  "5": "fifteen",
  "6": "sixteen",
  "7": "seventeen",
  "8": "eighteen",
  "9": "nineteen"
};

const tens = {
  "1": "ten",
  "2": "twenty",
  "3": "thirty",
  "4": "forty",
  "5": "fifty",
  "6": "sixty",
  "7": "seventy",
  "8": "eighty",
  "9": "ninety"
};
const ranges = {
  "1": " thousand ",
  "2": " million ",
  "3": " billion ",
  "4": " trillion ",
  "5": " quadrillion "
};

//A functions that takes an array, divides it into three-element arrays and returns an array of the new arrays
//Example input: [ '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
//Example output: [ [ '1', '2', '3' ], [ '4', '5', '6' ], [ '7', '8', '9' ] ]
const separate = arr => {
  const newArr = [];
  const arrCopy = arr;
  const separator = arr => {
    if (arr.length <= 3) {
      return newArr.unshift(arr);
    }
    const tempArr = arr.splice(-3, 3);
    newArr.unshift(tempArr);
    separator(arr);
  };
  separator(arrCopy);
  return newArr;
};

const baseConvert = arr => {
  const hundred = arr[0];
  const ten = arr[1];
  const one = arr[2];

  let converted = [];
  // if (hundred === 0 && ten === 0 && one === 0) {
  //   // return (converted = converted.concat(zero));
  // }
  if (hundred === 0) {
    if (ten === 0) {
      return (converted = converted.concat(ones[one]));
    } else {
      if (ten === 1 && one > 0) {
        return (converted = converted.concat(teens[one]));
      }
      if (ten === 1 && one === 0) {
        return (converted = converted.concat(ten[ten]));
      }
      if (ten > 1 && one === 0) {
        return (converted = converted.concat(ten[ten]));
      }
      if (ten > 1 && one > 0) {
        return (converted = converted.concat(ten[ten] + " " + ones[one]));
      }
    }
  }
  if (hundred > 0 && ten === 0) {
    if (one === 0) {
      return converted.concat(ones[hundred] + " hundred");
    } else {
      return (converted = converted.concat(
        ones[hundred] + " hundred and " + ones[one]
      ));
    }
  }
  if (hundred > 0 && ten === 1) {
    if (one === 0) {
      return (converted = converted.concat(
        ones[hundred] + " hundred and " + ten[ten]
      ));
    } else {
      return (converted = converted.concat(
        ones[hundred] + " hundred and " + teens[one]
      ));
    }
  }
  if (hundred > 0 && ten > 1) {
    if (one === 0) {
      return (converted = converted.concat(
        ones[hundred] + " hundred and " + ten[ten]
      ));
    } else {
      return (converted = converted.concat(
        ones[hundred] + " hundred and " + ten[ten] + " " + ones[one]
      ));
    }
  }
  return converted;
};

// Checks if all elements of the given array are zeros, returns true / false
const isZero = arr =>
  arr.reduce((acc, curr) => {
    curr === 0 ? acc : (acc = false);
    return acc;
  }, true);
//Takes an array and fills it up with leading zeros untill the lenght of the array is 3
const fillUpArrayWithLeadingZeros = arr => {
  for (let i = arr.length; i < 3; i++) {
    arr.unshift(0);
  }
  return arr;
};

//Converts an array of numerical strings to an array of numbers
const numericalSringArrayToNumberArray = arr => {
  return arr.map(el => Number(el));
};

const convertNumber = num => {
  try {
    if (typeof num !== "number") {
      throw new Error(
        " Please provide a valid number. Valid is a number of up to 15 numerical characters"
      );
    }
    const numToString = num.toString(10);

    if (numToString.length > 15) {
      throw new Error(
        " The number is too large. Please use a number of up to 15 digits."
      );
    } else {
      const numToString = num.toString(10);
      const numToStringArray = numToString.split("");
      if (numToStringArray.length < 3) {
        fillUpArrayWithLeadingZeros(numToStringArray);
      }
      const numbersArray = numericalSringArrayToNumberArray(numToStringArray);

      let numberSplittedIntoRangesArray = separate(numbersArray);

      if (numberSplittedIntoRangesArray.length === 1) {
        numberSplittedIntoRangesArray = numberSplittedIntoRangesArray.flat();
        let converted;
        isZero(numberSplittedIntoRangesArray)
          ? (converted = zero)
          : (converted = baseConvert(numberSplittedIntoRangesArray).join(" "));
        console.log(converted);
        return converted;
      }
      numberSplittedIntoRangesArray.reverse();

      let converted = numberSplittedIntoRangesArray.reduce(
        (acc, curr, index) => {
          if (curr.length < 3) {
            fillUpArrayWithLeadingZeros(curr);
          }
          if (index === 0) {
            if (curr[0] === 0) {
              isZero(curr) ? acc : acc.unshift("and " + baseConvert(curr));
              return acc;
            }
            acc.unshift(baseConvert(curr));
            return acc;
          }
          if (isZero(curr)) {
            return acc;
          }
          acc.unshift(baseConvert(curr) + ranges[index]);
          acc = acc.flat();
          return acc;
        },
        []
      );
      converted = converted.join(" ");
      console.log(converted);
      return converted;
    }
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

module.exports = convertNumber;
convertNumber(2000502);
