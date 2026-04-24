const BASE = '/api/todos';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

export const api = {
  getAll: () => request(BASE),
  create: (payload) => request(BASE, { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  toggleDone: (id) => request(`${BASE}/${id}/done`, { method: 'PATCH' }),
  delete: (id) => request(`${BASE}/${id}`, { method: 'DELETE' }),
};
