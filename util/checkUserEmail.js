async function checkUserEmail(email) {
  if (email) {
    const data = await fetch(`http://localhost:3000/api/user?email=${email}`);

    const response = await data.json();
    console.log(response);
    const isReturningUser =
      response?.response?.lastErrorObject?.updatedExisting;

    return { response, isReturningUser };
  }
}

export default checkUserEmail;
