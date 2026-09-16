async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || "request-failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const listItems = (key) => request(`/api/${key}`);

export const createItem = (key, payload) => request(`/api/${key}`, { method: "POST", body: JSON.stringify(payload) });

export const updateItem = (key, id, payload) =>
  request(`/api/${key}/${id}`, { method: "PUT", body: JSON.stringify(payload) });

export const deleteItem = (key, id) => request(`/api/${key}/${id}`, { method: "DELETE" });

export const reorderItems = (key, order) =>
  request(`/api/${key}/order`, { method: "PUT", body: JSON.stringify({ order }) });

export const getSingleton = (key) => request(`/api/${key}`);

export const updateSingleton = (key, payload) =>
  request(`/api/${key}`, { method: "PUT", body: JSON.stringify(payload) });
