import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const Stats = () => {
  const authContext = useContext(AuthContext);

  // load user to ensure user is authenticated
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="private-page">
      <h1>This is the Stats page</h1>
    </div>
  );
};

export default Stats;
