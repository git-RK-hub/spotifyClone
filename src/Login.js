import React from "react";
import "./login.css";
import { accessUrl } from "./spotify";

const login = () => {
  return (
    <div className="login__page">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify logo"
      />
      <a href={accessUrl}>Login with spotify</a>
    </div>
  );
};
export default login;
