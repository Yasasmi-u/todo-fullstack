import { useState } from 'react';
import styles from './TodoForm.module.css';

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    else if (title.trim().length > 200) e.title = 'Max 200 characters';
    if (description.length > 1000) e.description = 'Max 1000 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    try {
      await onCreate({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
      setExpanded(false);
    } catch (_) {
      // toast handled in hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.titleRow}>
        <input
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          type="text"
          placeholder="Add a new task…"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })); }}
          onFocus={() => setExpanded(true)}
          maxLength={210}
          aria-label="Task title"
        />
        <button
          type="submit"
          className={styles.addBtn}
          disabled={submitting}
          aria-label="Add task"
        >
          {submitting ? <span className={styles.spinner} /> : '+'}
        </button>
      </div>

      {errors.title && <p className={styles.error}>{errors.title}</p>}

      {expanded && (
        <div className={styles.extra}>
          <textarea
            className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: '' })); }}
            rows={3}
            maxLength={1010}
            aria-label="Task description"
          />
          {errors.description && <p className={styles.error}>{errors.description}</p>}
          <div className={styles.charCount}>{description.length}/1000</div>
        </div>
      )}
    </form>
  );
}
