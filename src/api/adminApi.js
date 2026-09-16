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

export const login = (username, password) =>
  request("/api/admin/login", { method: "POST", body: JSON.stringify({ username, password }) });

export const logout = () => request("/api/admin/logout", { method: "POST" });

export const me = () => request("/api/admin/me");

export const listServices = () => request("/api/services");

export const createService = (payload) =>
  request("/api/services", { method: "POST", body: JSON.stringify(payload) });

export const updateService = (id, payload) =>
  request(`/api/services/${id}`, { method: "PUT", body: JSON.stringify(payload) });

export const deleteService = (id) => request(`/api/services/${id}`, { method: "DELETE" });

export const reorderServices = (order) =>
  request("/api/services/order", { method: "PUT", body: JSON.stringify({ order }) });
