import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const Entries = () => {
  const authContext = useContext(AuthContext);

  // load user to ensure user is authenticated
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>This is the entries page</h1>
    </div>
  );
};

export default Entries;
