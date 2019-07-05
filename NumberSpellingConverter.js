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

const decimalRanges = {
  "1": "tenths",
  "2": "hundredths",
  "3": "thousandths",
  "4": "ten-thousandths"
};

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

function adjustDecimalToPrecision(number, precision) {
  try {
    let numberCopy = number.toString(10);
    const numberCopyArray = numberCopy.split(".");

    typeof precision !== "number" && numberCopyArray.length > 1
      ? (precisionCopy = numberCopyArray[1].length)
      : (precisionCopy = precision);

    numberCopy = Number(numberCopy).toFixed(precisionCopy);

    const splitFinalNumber = numberCopy.split(".");

    let int = Number(splitFinalNumber[0]);
    let dec = Number(splitFinalNumber[1]);

    return [int, dec, precisionCopy];
  } catch (err) {
    return err.message;
  }
}

const useDecimalRange = num => {
  switch (num) {
    case 1:
    case 2:
    case 3:
    case 4:
      return decimalRanges[num];
    default:
      break;
  }
};
const baseConvert = arr => {
  const hundred = arr[0];
  const ten = arr[1];
  const one = arr[2];

  let converted = [];

  if (hundred === 0) {
    if (ten === 0) {
      return (converted = converted.concat(ones[one]));
    } else {
      if (ten === 1 && one > 0) {
        return (converted = converted.concat(teens[one]));
      }
      if (ten === 1 && one === 0) {
        return (converted = converted.concat(tens[ten]));
      }
      if (ten > 1 && one === 0) {
        return (converted = converted.concat(tens[ten]));
      }
      if (ten > 1 && one > 0) {
        return (converted = converted.concat(tens[ten] + " " + ones[one]));
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
        ones[hundred] + " hundred and " + tens[ten]
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
        ones[hundred] + " hundred and " + tens[ten]
      ));
    } else {
      return (converted = converted.concat(
        ones[hundred] + " hundred and " + tens[ten] + "-" + ones[one]
      ));
    }
  }
  return converted;
};

const isZero = arr =>
  arr.reduce((acc, curr) => {
    curr === 0 ? acc : (acc = false);
    return acc;
  }, true);

const fillUpArrayWithLeadingZeros = arr => {
  for (let i = arr.length; i < 3; i++) {
    arr.unshift(0);
  }
  return arr;
};

const numericalSringArrayToNumberArray = arr => {
  return arr.map(el => Number(el));
};

const convertInteger = num => {
  try {
    const numToString = num.toString(10);

    if (numToString.length > 15) {
      throw new Error(" The number is too large.");
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
      return converted;
    }
  } catch (err) {
    return err.message;
  }
};
const spellNumber = (number, precision) => {
  try {
    let numberCopy = number.valueOf();
    if (typeof numberCopy !== "number") {
      throw new Error(" Argument should be a number ");
    }
    if (Number.isInteger(number)) {
      return convertInteger(number);
    } else {
      numberCopy = numberCopy.toString(10);
    }
    const numberCopyArray = numberCopy.split(".");
    if (numberCopyArray[1] && numberCopyArray[1].length > 4) {
      throw new Error(
        "Please provide only numbers with up to four decimal digits"
      );
    } else {
      let getNumberArray;
      getNumberArray = [...adjustDecimalToPrecision(number, precision)];
      const integerPortion = getNumberArray[0];
      let decimalPortion = getNumberArray[1];
      const precisionCopy = getNumberArray[2];
      const spelledNumber =
        convertInteger(integerPortion) +
        " and " +
        convertInteger(decimalPortion) +
        " " +
        useDecimalRange(precisionCopy);
      return spelledNumber;
    }
  } catch (err) {
    return err.message;
  }
};

function handleInput() {
  const button = document.getElementById("convert");
  let result = document.getElementById("result");
  function handleClick() {
    button.addEventListener("click", e => {
      let numberInput = document.getElementById("numberField").value;
      numberInput = Number(numberInput);
      const spelled = spellNumber(numberInput);
      result.innerHTML = spelled;
    });
  }
  button.onclick = handleClick;
}
window.onload = handleInput;
