import { useEffect, useState } from "react"
import { apiFetch } from "../services/api"
import Navbar from "../components/Navbar"

export default function Carrito() {
  const [carrito, setCarrito] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || []
    setCarrito(data)
  }, [])

  function eliminar(index) {
    const nuevo = [...carrito]
    nuevo.splice(index, 1)
    setCarrito(nuevo)
    localStorage.setItem("carrito", JSON.stringify(nuevo))
  }

  // 🔥 👉 ACÁ VA TU FUNCIÓN
  async function comprar() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || []

    const items = carrito.map(p => ({
      product_id: p.id,
      quantity: p.cantidad || 1
    }))

    const total = carrito.reduce((acc, p) => acc + p.price, 0)

    await apiFetch("/orders/", {
      method: "POST",
      body: JSON.stringify({
        items,
        total,
        status: "pending"
      })
    })

    localStorage.removeItem("carrito")
    alert("Compra realizada")
    setCarrito([]) // 🔥 limpia la UI
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl mb-6">Carrito</h2>

        {carrito.map((p, i) => (
          <div key={i} className="bg-slate-900 p-4 mb-3 rounded">
            <p>{p.name}</p>
            <p>${p.price}</p>

            <button
              onClick={() => eliminar(i)}
              className="text-red-400"
            >
              Eliminar
            </button>
          </div>
        ))}

        {/* 🔥 BOTÓN QUE USA comprar() */}
        <button
          onClick={comprar}
          className="mt-6 bg-green-600 px-4 py-2 rounded"
        >
          Comprar
        </button>

      </div>
    </div>
  )
}