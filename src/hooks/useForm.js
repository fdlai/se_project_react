import { useState } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return { values, setValues, handleChange };
}

export default useForm;
