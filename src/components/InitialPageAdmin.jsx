import { useContext } from "react"
import { AdminContext } from "../context/useAdminContext"

function InitialPageAdmin(){
    const {nombre} = useContext(AdminContext)
    return(
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 cursor-pointer m-10 flex flex-col gap-10">
            <h1 className="text-4xl font-bold text-center">Sistema de pedidos de Administrador</h1>
            <p className="text-white text-lg font-bold">Bienvenido: <span>{nombre}</span></p>
            <img src="" alt="" />
        </section>
    )
}

export default InitialPageAdmin