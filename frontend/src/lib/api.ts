const API_BASE =
  import.meta.env.VITE_API_BASE ??
  "http://127.0.0.1:8000/api";

export function getToken() {
  return localStorage.getItem("inkspire_token");
}

export function setToken(token: string) {
  localStorage.setItem("inkspire_token", token);
}

export function removeToken() {
  localStorage.removeItem("inkspire_token");
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = getToken();

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const data = await response.json();
      message = data.detail || message;
    } catch {}

    throw new Error(message);
  }

  if (response.status === 204) return null;

  return response.json();
}