import React from "react";

function useForm(inputValues = {}) {
  const [values, setValues] = React.useState(inputValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
  };
  return { values, handleChange, setValues, errors, isValid, setErrors, setIsValid };
}

export default useForm