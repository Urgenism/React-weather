import { useState } from 'react';

export const useHandleInputChange = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);
  };

  return { value, handleChange };
};
