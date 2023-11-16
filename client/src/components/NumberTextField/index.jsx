import React from "react";
import TextField from "@mui/material/TextField";

const NumberTextField = (props) => {
  const { isNumber, ...otherProps } = props;

  const onChange = (e) => {
    const { value } = e.target;

    const regex = /^[0-9\b]+$/;
    if (value === "" || regex.test(value)) {
      props.onChange(e);
    }
  };

  return <TextField {...otherProps} onChange={onChange} />;
};

export default NumberTextField;
