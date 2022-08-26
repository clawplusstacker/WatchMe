import React from "react";
import { UserAuth } from "../contexts/AuthContext.js";
import { Button } from "antd";

const Logout = () => {

  const {user, logOut} = UserAuth();


  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error)
    } 
  }


  return (
    <Button
      onClick={handleSignOut}
    >
        Logout
    </Button>
  );
};

export default Logout;