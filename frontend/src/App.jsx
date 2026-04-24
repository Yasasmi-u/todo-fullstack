import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import styles from './App.module.css';

export default function App() {
  const { todos, loading, error, createTodo, updateTodo, toggleDone, deleteTodo, refetch } = useTodos();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  }), [todos]);

  const filtered = useMemo(() => {
    let list = todos;
    if (filter === 'active') list = list.filter((t) => !t.done);
    if (filter === 'done') list = list.filter((t) => t.done);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [todos, filter, search]);

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>Taskly</span>
        </div>
        <p className={styles.tagline}>Stay focused. Get things done.</p>
      </header>

      <main className={styles.main}>
        {/* Create form */}
        <TodoForm onCreate={createTodo} />

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <FilterBar current={filter} onChange={setFilter} counts={counts} />
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className={styles.search}
              type="text"
              placeholder="Search tasks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tasks"
            />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch('')} aria-label="Clear search">×</button>
            )}
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className={styles.center}>
            <div className={styles.loadingDots}>
              <span /><span /><span />
            </div>
            <p className={styles.loadingText}>Loading your tasks…</p>
          </div>
        )}

        {error && !loading && (
          <div className={styles.errorState}>
            <span className={styles.errorIcon}>⚠</span>
            <p>Could not connect to the server.</p>
            <button className={styles.retryBtn} onClick={refetch}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                {search ? (
                  <>
                    <span className={styles.emptyIcon}>🔍</span>
                    <p>No tasks match <strong>"{search}"</strong></p>
                    <button className={styles.retryBtn} onClick={() => setSearch('')}>Clear search</button>
                  </>
                ) : filter !== 'all' ? (
                  <>
                    <span className={styles.emptyIcon}>{filter === 'done' ? '🎉' : '⚡'}</span>
                    <p>{filter === 'done' ? 'Nothing completed yet.' : 'All tasks are done!'}</p>
                  </>
                ) : (
                  <>
                    <span className={styles.emptyIcon}>📋</span>
                    <p>No tasks yet. Add one above!</p>
                  </>
                )}
              </div>
            ) : (
              <ul className={styles.list} role="list">
                {filtered.map((todo) => (
                  <li key={todo._id} role="listitem">
                    <TodoItem
                      todo={todo}
                      onToggle={toggleDone}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  </li>
                ))}
              </ul>
            )}

            {/* Footer stats */}
            {todos.length > 0 && (
              <p className={styles.stats}>
                {counts.done} of {counts.all} tasks completed
                {counts.active > 0 && ` · ${counts.active} remaining`}
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
