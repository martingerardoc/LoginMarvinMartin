export const API_URL = "https://api-funval-g6.onrender.com"

export function getToken() {
  return localStorage.getItem("token")
}

export async function apiFetch(endpoint, options = {}) {
  const token = getToken()

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  })

  const data = await res.json()

  if (!res.ok) {
  const errorData = await res.json()
  console.log("ERROR BACKEND:", errorData)
  throw new Error(JSON.stringify(errorData))
}

  return data
}