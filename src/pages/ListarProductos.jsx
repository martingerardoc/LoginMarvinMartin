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
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Productos</h2>
          <p className="text-slate-400 text-sm mt-1">
            {productos.length} productos encontrados
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/20 transition">
          + Nuevo Producto
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {productos.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 hover:shadow-lg hover:shadow-black/30 transition-all duration-200"
          >
            
            {/* ICONO */}
            <div className="w-10 h-10 mb-4 rounded-lg bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V7a2 2 0 00-2-2h-3V3H9v2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2h-3v-2H9v2H6a2 2 0 01-2-2v-6m16 0H4" />
              </svg>
            </div>

            {/* INFO */}
            <p className="text-slate-400 text-xs mb-1">Producto</p>
            <p className="text-white font-semibold text-lg mb-3 truncate">
              {p.name}
            </p>

            <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
              <span className="text-slate-400 text-xs">Precio</span>
              <span className="text-xl font-bold text-white">
                ${p.price}
              </span>
            </div>

            {/* BOTONES */}
            <div className="mt-4 flex gap-2">
              
              <button
                className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500/30 text-yellow-400 text-sm py-2 rounded-lg transition"
              >
                Editar
              </button>

              <button
                onClick={() => eliminar(p.id)}
                className="flex-1 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 text-sm py-2 rounded-lg transition"
              >
                Eliminar
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}