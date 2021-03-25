import React from "react";
import "./Sidebaroption.css";

function SidebarOption({ option = "test", Icon, clicked }) {
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h4 onClick={clicked}>{option}</h4>
      ) : (
        <p onClick={clicked}>{option}</p>
      )}
    </div>
  );
}

export default SidebarOption;
