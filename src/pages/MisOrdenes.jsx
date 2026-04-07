import { useEffect, useState } from "react"
import { apiFetch } from "../services/api"

export default function MisOrdenes() {
  const [ordenes, setOrdenes] = useState([])

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    const data = await apiFetch("/orders/")
    setOrdenes(data)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <h2 className="text-2xl mb-6">Mis Órdenes</h2>

      {ordenes.map(o => (
        <div key={o.id} className="bg-slate-900 p-4 mb-3 rounded">

          <p>Total: ${o.total}</p>
          <p>Estado: {o.status}</p>

        </div>
      ))}
    </div>
  )
}