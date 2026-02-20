import { useState, ChangeEvent } from "react";

export const useSearch = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return { inputValue, handleInputChange };
};
