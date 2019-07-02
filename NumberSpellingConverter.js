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
const div = arr => {
  const newArr = [];
  const arr1 = arr;
  const divider = arr => {
    if (arr.length <= 3) {
      return newArr.unshift(arr);
    }
    const tempArr = arr.splice(-3, 3);
    newArr.unshift(tempArr);
    divider(arr);
  };
  divider(arr1);
  return newArr;
};

// Convert an array of three elements, all numbers from 0-9 - into the corresponding words from the dictionaries
const baseConvert = arr => {
  const hundr = arr[0];
  const tn = arr[1];
  const ons = arr[2];

  let converted = [];
  if (hundr === 0 && tn === 0 && ons === 0) {
    // return (converted = converted.concat(zero));
  }
  if (hundr === 0) {
    if (tn === 0) {
      return (converted = converted.concat(ones[ons]));
    } else {
      if (tn === 1 && ons > 0) {
        return (converted = converted.concat(teens[ons]));
      }
      if (tn === 1 && ons === 0) {
        return (converted = converted.concat(tens[tn]));
      }
      if (tn > 1 && ons === 0) {
        return (converted = converted.concat(tens[tn]));
      }
      if (tn > 1 && ons > 0) {
        return (converted = converted.concat(tens[tn] + " " + ones[ons]));
      }
    }
  }
  if (hundr > 0 && tn === 0) {
    if (ons === 0) {
      return converted.concat(ones[hundr] + " hundred");
    } else {
      return (converted = converted.concat(
        ones[hundr] + " hundred and " + ones[ons]
      ));
    }
  }
  if (hundr > 0 && tn === 1) {
    if (ons === 0) {
      return (converted = converted.concat(
        ones[hundr] + " hundred and " + tens[tn]
      ));
    } else {
      return (converted = converted.concat(
        ones[hundr] + " hundred and " + teens[ons]
      ));
    }
  }
  if (hundr > 0 && tn > 1) {
    if (ons === 0) {
      return (converted = converted.concat(
        ones[hundr] + " hundred and " + tens[tn]
      ));
    } else {
      return (converted = converted.concat(
        ones[hundr] + " hundred and " + tens[tn] + " " + ones[ons]
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
const fillUpArr = arr => {
  for (let i = arr.length; i < 3; i++) {
    arr.unshift(0);
  }
  return arr;
};

//Converts an array of numerical strings to an array of numbers
const numSringToNumber = arr => {
  return arr.map(el => Number(el));
};

const convertNumber = num => {
  try {
    if (typeof num !== "number") {
      throw new Error(
        " Please provide a valid number. Valid is a number of up to 15 numerical characters"
      );
    }

    // If it's a number, convert it to string
    const numToString = num.toString(10);

    //CHeck if the length is within the range - 15 digits long
    if (numToString.length > 15) {
      throw new Error(
        " The number is too large. Please use a number of up to 15 digits."
      );
    } else {
      const numToString = num.toString(10); //convert the number to string to be able to spilt
      const numToStringArr = numToString.split(""); // spilt to individual numbers, in string form
      if (numToStringArr.length < 3) {
        fillUpArr(numToStringArr);
      }
      const numArray = numSringToNumber(numToStringArr); // convert each individual numerical string to number. result is an array of numbers

      let arrNumber = div(numArray); // divide the array of numbers into portions of threee numbers each. result is an array like this: [ [1,2,3], [4,5,6], [7,8,9] ]
      // console.log(arrNumber, " Original number array");

      // Check if the array of number arrays has only one element (e.g. - if we only have one three digit number)
      // Returns zero or the passed number of up to three digits
      if (arrNumber.length === 1) {
        arrNumber = arrNumber.flat(); // Flatten the array for easier use
        const probe = isZero(arrNumber);
        console.log(probe);

        let converted;
        probe
          ? (converted = zero)
          : (converted = baseConvert(arrNumber).join(" "));
        console.log(converted);
        return converted;
      }
      // This code runs if the array of numerical arrays has more than one element ( e.g. - we have passed a number > 999)
      arrNumber.reverse(); // reverse the positions of the numerical arrays

      // convert the reversed array
      let converted = arrNumber.reduce((acc, curr, index) => {
        if (curr.length < 3) {
          fillUpArr(curr);
        }
        if (index === 0) {
          if (curr[0] === 0) {
            if (isZero(curr)) {
              return acc;
            }
            acc.unshift("and " + baseConvert(curr));
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
      }, []);
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
// convertNumber(084);
