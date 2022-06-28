const getPortfolio = async (email) => {
  const data = await fetch(`http://localhost:3000/api/user?email=${email}`);

  const response = await data.json();
  console.log(response);
  return response;
};

export default getPortfolio;
