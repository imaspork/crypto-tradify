const checkIsNotNew = () => {
  console.log(JSON.parse(localStorage.getItem("isNew")) === false);
  return JSON.parse(localStorage.getItem("isNew")) === false;
};

export default checkIsNotNew;
