import React from "react";
import classnames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  
  //classnames takes "button" as the class to add on to
  //then checks if e.g."button--confirm" is truthy and does its magic
  const buttonClass = classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
