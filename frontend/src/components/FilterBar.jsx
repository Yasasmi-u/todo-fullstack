import styles from './FilterBar.module.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
];

export default function FilterBar({ current, onChange, counts }) {
  return (
    <div className={styles.bar}>
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={`${styles.btn} ${current === key ? styles.active : ''}`}
          onClick={() => onChange(key)}
        >
          {label}
          <span className={styles.count}>{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
