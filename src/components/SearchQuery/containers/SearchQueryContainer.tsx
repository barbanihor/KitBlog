import { useState } from 'react';
import { SearchQuery } from '../views/SearchQuery';

interface Props {
  onChange?: (value: string) => void;
  value?: string;
  placeholder: string;
}

export const SearchQueryContainer: React.FC<Props> = ({
  placeholder,
  onChange,
  value,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <SearchQuery
      value={value ?? inputValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
