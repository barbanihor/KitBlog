import { useState } from 'react';
import { SearchQuery } from '../views/SearchQuery';

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <SearchQuery
      value={value ? value : inputValue}
      onChange={onChange ? onChange : handleChange}
      placeholder={placeholder}
    />
  );
};
