import { useState, useEffect } from "react";

function useForm({ isOpen, inputValues }) {
  const [values, setValues] = useState(inputValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //if the modal is open and it has been submitted, then reset the modal form
  useEffect(() => {
    if (isOpen && isSubmitted) {
      let updatedInputValues = {};
      Object.keys(inputValues).forEach((key) => (updatedInputValues[key] = ""));
      setValues(updatedInputValues);
      setIsSubmitted(false);
    }
  }, [isOpen]);

  return { values, setValues, handleChange, isSubmitted, setIsSubmitted };
}

export default useForm;
