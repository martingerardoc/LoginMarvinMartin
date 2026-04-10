import { useEffect, useState } from "react"
import { apiFetch } from "../services/api"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function ClienteHome() {
  const [productos, setProductos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    const data = await apiFetch("/products/")
    setProductos(data)
  }

  function agregarAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || []

    carrito.push({
      ...producto,
      cantidad: 1
    })

    localStorage.setItem("carrito", JSON.stringify(carrito))
    alert("Producto agregado al carrito")
  }

  return (
    
    <div className=" bg-slate-950 text-white">

      {/* NAV */}
      <Navbar />
      <div className="flex gap-4 my-10 mx-5">
        <button
          onClick={() => navigate("/carrito")}
          className="bg-green-600 px-4 py-2 rounded font-semibold"
        >
          Ver Carrito
        </button>

        <button
          onClick={() => navigate("/mis-ordenes")}
          className="bg-blue-600 px-4 py-2 rounded font-semibold"
        >
          Mis Órdenes
        </button>
      </div>

      <h2 className="text-2xl font-bold m-5">Productos</h2>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
        {productos.map(p => (
          <article key={p.id} className="bg-slate-900 p-4 rounded-xl flex flex-col gap-3">
            <img src={p.image_url} alt={p.name} className="rounded-2xl w-full h-64 object-cover" />

            <p className="font-bold text-lg truncate">{p.name}</p>
            <p className="text-slate-400 text-sm mb-2 truncate">{p.description}</p>

            <p className="text-xl font-bold mb-4">${p.price}</p>

            <button
              onClick={() => agregarAlCarrito(p)}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
            >
              Agregar al carrito
            </button>
          </article>
        ))}
      </section>
    </div>
  )
}
