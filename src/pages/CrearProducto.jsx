import { useState } from "react"
import { apiFetch } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function CrearProducto() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: ""
  })

  const navigate = useNavigate()

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    await apiFetch("/products/", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      })
    })

    navigate("/productos")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl border border-slate-800 w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Crear Producto
        </h2>

        {/* NOMBRE */}
        <input
          name="name"
          placeholder="Nombre del producto"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {/* PRECIO */}
        <input
          name="price"
          placeholder="Precio"
          type="number"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {/* DESCRIPCIÓN */}
        <textarea
          name="description"
          placeholder="Descripción del producto"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* IMAGEN */}
        <input
          name="image"
          placeholder="URL de la imagen"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* STOCK */}
        <input
          name="stock"
          placeholder="Stock disponible"
          type="number"
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* BOTÓN */}
        <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg font-semibold transition">
          Crear Producto
        </button>

      </form>
    </div>
  )
}