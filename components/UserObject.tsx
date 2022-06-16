import React, { useEffect, useState } from "react";

const UserObject = (userData) => {
  const [userState, setUserState] = useState(null);

  const data = userData;
  useEffect(() => {
    setUserState(userData.userData);
  }, [userData]);
  return (
    <React.Fragment>
      <h1>
        <pre>{userState?.USDHeld}</pre>
        {/* YAY */}
      </h1>
    </React.Fragment>
  );
};

export default UserObject;
