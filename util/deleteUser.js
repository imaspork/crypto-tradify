import { signOut } from "next-auth/client";
const deleteAccountData = async (userEmail) => {
  const response = fetch(
    `http://localhost:3000/api/deleteUser?email=${userEmail}`
  )
    .then((response) => {
      signOut();
      localStorage.clear();
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export default deleteAccountData;
