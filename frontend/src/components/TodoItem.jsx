import { useState } from 'react';
import styles from './TodoItem.module.css';

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [deleting, setDeleting] = useState(false);

  const startEdit = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description || '');
    setEditing(true);
    setErrors({});
  };

  const cancelEdit = () => {
    setEditing(false);
    setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!editTitle.trim()) e.title = 'Title is required';
    else if (editTitle.trim().length > 200) e.title = 'Max 200 characters';
    if (editDesc.length > 1000) e.description = 'Max 1000 characters';
    return e;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      await onUpdate(todo._id, { title: editTitle.trim(), description: editDesc.trim() });
      setEditing(false);
    } catch (_) {
      // toast handled in hook
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(todo._id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSave();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className={`${styles.item} ${todo.done ? styles.done : ''} ${deleting ? styles.deleting : ''}`}>
      {/* Checkbox */}
      <button
        className={`${styles.checkbox} ${todo.done ? styles.checked : ''}`}
        onClick={() => onToggle(todo._id)}
        aria-label={todo.done ? 'Mark as undone' : 'Mark as done'}
      >
        {todo.done && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className={styles.content}>
        {editing ? (
          <div className={styles.editForm} onKeyDown={handleKeyDown}>
            <input
              className={`${styles.editInput} ${errors.title ? styles.inputError : ''}`}
              value={editTitle}
              onChange={(e) => { setEditTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })); }}
              autoFocus
              maxLength={210}
              placeholder="Task title"
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
            <textarea
              className={`${styles.editTextarea} ${errors.description ? styles.inputError : ''}`}
              value={editDesc}
              onChange={(e) => { setEditDesc(e.target.value); setErrors((p) => ({ ...p, description: '' })); }}
              placeholder="Description (optional)"
              rows={2}
              maxLength={1010}
            />
            {errors.description && <span className={styles.error}>{errors.description}</span>}
            <div className={styles.editActions}>
              <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                {saving ? <span className={styles.spinner} /> : 'Save'}
              </button>
              <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>
              <span className={styles.hint}>Ctrl+Enter to save · Esc to cancel</span>
            </div>
          </div>
        ) : (
          <>
            <p className={styles.title}>{todo.title}</p>
            {todo.description && <p className={styles.desc}>{todo.description}</p>}
          </>
        )}
      </div>

      {/* Actions */}
      {!editing && (
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={startEdit} aria-label="Edit task">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className={styles.deleteBtn}
            onClick={handleDelete}
            disabled={deleting}
            aria-label="Delete task"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
