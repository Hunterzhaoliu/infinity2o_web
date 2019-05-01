import React from "react";

const Emoji = props => (
  <span
    style={{
      fontSize: props.fontSize
    }}
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);
export default Emoji;
