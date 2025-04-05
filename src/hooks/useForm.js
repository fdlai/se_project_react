import { useState, useEffect, useMemo } from "react";

function useForm({ isOpen, inputValues, defaultValidities = {} }) {
  const [values, setValues] = useState(inputValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validities, setValidities] = useState(defaultValidities);

  const isFormValid = Object.values(validities).every(
    (isValid) => isValid === true
  );

  // function getDefaultValidities() {
  //   const defaultValidities = {};
  //   Object.keys(inputValues).forEach((inputValue) => {
  //     defaultValidities[`${inputValue}Valid`] = false;
  //   });
  //   return defaultValidities;
  // }

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setValidities({
      ...validities,
      [`${e.target.name}Valid`]: e.target.validity.valid,
    });
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

  return {
    values,
    setValues,
    handleChange,
    isSubmitted,
    setIsSubmitted,
    isFormValid,
  };
}

export default useForm;
