import React, { MouseEventHandler } from "react";

interface BoxProps {
  value: string,
  handleBoxClick: MouseEventHandler,
};

const Box: React.FC<BoxProps> = (props) => {
  return (
    <div className="box" onClick={props.handleBoxClick}>
      {props.value}
    </div>
  );
};

export default Box;