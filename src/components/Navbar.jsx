import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const nombre = localStorage.getItem("username")

  function logout() {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
      
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold">S</span>
        </div>
        <span className="font-bold text-lg">Shop App</span>
      </div>

      {/* LINKS */}
      <nav className="flex items-center gap-4">

        <button
          onClick={() => navigate("/cliente")}
          className="text-slate-300 hover:text-white text-sm"
        >
          Productos
        </button>

        <button
          onClick={() => navigate("/carrito")}
          className="text-slate-300 hover:text-white text-sm"
        >
          Carrito
        </button>

        <button
          onClick={() => navigate("/mis-ordenes")}
          className="text-slate-300 hover:text-white text-sm"
        >
          Órdenes
        </button>

      </nav>

      {/* USER */}
      <div className="flex items-center gap-4">
        <span className="text-slate-400 text-sm">
          Hola, <span className="text-white font-semibold">{nombre}</span>
        </span>

        <button
          onClick={logout}
          className="bg-red-600/20 border border-red-500/30 text-red-400 px-3 py-1 rounded-lg text-sm"
        >
          Salir
        </button>
      </div>

    </header>
  )
}