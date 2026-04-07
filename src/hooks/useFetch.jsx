import { useState, useEffect } from "react"

export default function useFetch(endpoint) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(`https://api-funval-g6.onrender.com${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })

        const json = await res.json()
        if (!res.ok) throw new Error("Error")

        setData(json)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, loading, error }
}