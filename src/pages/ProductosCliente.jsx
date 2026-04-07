import { useEffect, useState } from "react"
import { apiFetch } from "../services/api"

export default function ProductosCliente() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    const data = await apiFetch("/products/")
    setProductos(data)
  }

  async function agregar(id) {
    await apiFetch("/cart/", {
      method: "POST",
      body: JSON.stringify({ product_id: id, quantity: 1 })
    })
  }

  return (
    <div>
      {productos.map(p => (
        <div key={p.id}>
          {p.name}
          <button onClick={() => agregar(p.id)}>Agregar</button>
        </div>
      ))}
    </div>
  )
}