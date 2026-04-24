import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { api } from '../api/todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const res = await api.getAll();
      setTodos(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  // Create
  const createTodo = useCallback(async ({ title, description }) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic = { _id: tempId, title, description, done: false, createdAt: new Date().toISOString() };

    // Optimistic update — add to top
    setTodos((prev) => [optimistic, ...prev]);

    try {
      const res = await api.create({ title, description });
      setTodos((prev) => prev.map((t) => (t._id === tempId ? res.data : t)));
      toast.success('Task created!');
    } catch (err) {
      setTodos((prev) => prev.filter((t) => t._id !== tempId));
      toast.error(err.message);
      throw err;
    }
  }, []);

  // Update
  const updateTodo = useCallback(async (id, payload) => {
    const previous = todos.find((t) => t._id === id);
    setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, ...payload } : t)));

    try {
      const res = await api.update(id, payload);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      toast.success('Task updated!');
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === id ? previous : t)));
      toast.error(err.message);
      throw err;
    }
  }, [todos]);

  // Toggle done — optimistic
  const toggleDone = useCallback(async (id) => {
    setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t)));

    try {
      const res = await api.toggleDone(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t)));
      toast.error(err.message);
    }
  }, []);

  // Delete — optimistic
  const deleteTodo = useCallback(async (id) => {
    const previous = todos.find((t) => t._id === id);
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      await api.delete(id);
      toast.success('Task deleted');
    } catch (err) {
      setTodos((prev) => [previous, ...prev]);
      toast.error(err.message);
    }
  }, [todos]);

  return { todos, loading, error, createTodo, updateTodo, toggleDone, deleteTodo, refetch: fetchTodos };
}
