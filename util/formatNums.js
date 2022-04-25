function formatNums(num) {
  const enteredNum = parseFloat(num);
  return enteredNum.toLocaleString("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default formatNums;
