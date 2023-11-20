import SignUp from "./SignUp";
import { useEffect } from "react";

const Account = () => {

useEffect(() => {
    document.title = "Account | StickTap";
});

  return (
    <SignUp />
  );
};

export default Account;