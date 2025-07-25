import styles from './SearchQuery.module.scss';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const SearchQuery: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.searchQuery}>
      <img src="icons/loopa.svg" className={styles.searchQuery__img} alt="search" />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchQuery__input}
        value={value}
        onChange={(event) => onChange(event)}
      />
    </div>
  );
};
