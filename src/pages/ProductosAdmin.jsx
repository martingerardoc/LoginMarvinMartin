import { useEffect, useState } from "react"
import { apiFetch } from "../services/api"

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    const data = await apiFetch("/products/")
    setProductos(data)
  }

  async function eliminar(id) {
    await apiFetch(`/products/${id}`, { method: "DELETE" })
    cargar()
  }

  return (
    <div>
      <h2>Productos</h2>
      {productos.map(p => (
        <div key={p.id}>
          {p.name} - ${p.price}
          <button onClick={() => eliminar(p.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}