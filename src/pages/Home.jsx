import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { useContext } from "react"
import useFetch from "../hooks/useFetch"
import LoadingSpinner from "../components/LoadingSpinner"
import { AdminContext } from "../context/useAdminContext"
import Pedidos from "./Pedidos"
import Crear from "./Crear"
import Productos from "./Productos"
import Usuarios from "./Usuarios"

export default function Home() {
    const {nombre, setPedidos} = useContext(AdminContext)
    const navigate = useNavigate()

    const {loading, error} = useFetch("https://api-funval-g6.onrender.com/orders/", setPedidos)

    if (loading){
        return(
            <LoadingSpinner/>
        )
    }

    function salir() {
        localStorage.clear()
        navigate("/Login")
    }
    
    return (
        <div className='min-h-screen bg-slate-950 text-white'>
            {/* Navbar */}
            <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg tracking-tight">Sistema de Pedidos del administrador</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-sm">Hola, <span className="text-white font-semibold">{nombre}</span></span>
                    <button
                        onClick={salir}
                        className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 hover:text-red-300 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Salir
                    </button>
                </div>
            </header>
            <nav className='flex gap-4 p-10 items-center justify-center flex-wrap'>
                <Link to="/pedidos" className='bg-[#155dfc] px-3 py-1 rounded-2xl hover:bg-[#155dfccc] font-semibold'>Ver Pedidos</Link>
                <Link to="/crear" className='bg-[#155dfc] px-3 py-1 rounded-2xl hover:bg-[#155dfccc] font-semibold'>Crear</Link>
                <Link to="/actualizar" className='bg-[#155dfc] px-3 py-1 rounded-2xl hover:bg-[#155dfccc] font-semibold'>Productos</Link>
                <Link to="/usuarios" className='bg-[#155dfc] px-3 py-1 rounded-2xl hover:bg-[#155dfccc] font-semibold'>Usuarios</Link>
                
            </nav>
            {/* Content */}
            <main>
                <Routes>
                    <Route path="/pedidos" element={<Pedidos/>}></Route>
                    <Route path="/crear" element={<Crear/>}></Route>
                    <Route path="/actualizar" element={<Productos/>}></Route>
                    <Route path="/usuarios" element={<Usuarios/>}></Route>
                </Routes>
            </main>
        </div>
        
    )
}
