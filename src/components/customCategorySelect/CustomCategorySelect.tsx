import Select, { MultiValue, StylesConfig } from 'react-select';
import styles from './CustomCategorySelect.module.scss';
import { postCategories } from '@/resources/postCategories';

export type Option = {
  value: string;
  label: string;
};

type Props = {
  placeholder: string;
  value: Option[];
  onChange: (value: Option[]) => void;
};

const customSelectStyles: StylesConfig<Option, true> = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? '1px solid #3e9ee3' : '1px solid #cbd5e0',
    borderRadius: '8px',
    height: '45px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #3e9ee3',
    },
  }),
  menu: (base) => ({
    ...base,
    marginTop: '8px',
    borderRadius: '8px',
    zIndex: 9999,
  }),
  multiValue: () => ({ display: 'none' }),
  placeholder: (base) => ({
    ...base,
    color: '#637387',
    fontSize: '14px',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: 'transform 0.2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
};

export const CustomPostCategorySelect = ({ placeholder, value, onChange }: Props) => {
  const options: Option[] = postCategories;

  const handleSelectChange = (selected: MultiValue<Option>) => {
    onChange(selected as Option[]);
  };

  return (
    <div>
      <Select
        options={options}
        isMulti
        onChange={handleSelectChange}
        styles={customSelectStyles}
        placeholder={placeholder}
        value={value}
      />

      {value.length > 0 && (
        <div className={styles.selectedTags}>
          {value.map((option) => (
            <span key={option.value} className={styles.tag}>
              {option.label}
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => onChange(value.filter((v) => v.value !== option.value))}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
