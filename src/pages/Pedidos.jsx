import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/useAdminContext'


function Pedidos(){
    const {pedidos, fetchPedidos} = useContext(AdminContext)
    
    const updateStatus = async (id, newStatus) => {
        const token = localStorage.getItem("token")
        try{
            const answer = await fetch(`https://api-funval-g6.onrender.com/orders/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({status: newStatus})
            })
            if (answer.ok) {
                await fetchPedidos()
            }

        }
        catch(error){
            console.log(error)
        }
    }
    
    return(
        <main className="px-6 py-8 ">
                    <div className="mb-6 ">
                        <h2 className="text-2xl font-bold text-white">Pedidos</h2>
                        <p className="text-slate-400 text-sm mt-1">{pedidos.length} pedidos encontrados</p>
                    </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
                    {pedidos.map((info, index) => {
                        const statusColor = info.status === "pagado"
                            ? "text-blue-400 bg-blue-400/10 border-blue-400/20"
                            : info.status === "pendiente"
                            ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
                            : "text-green-400 bg-green-400/10 border-green-400/20"

                        return (
                            <div
                                key={index}
                                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor}`}>
                                        {info.status}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs mb-1">Usuario</p>
                                <p className="text-white font-semibold text-sm mb-3 truncate">{info.id}</p>
                                <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                                    <span className="text-slate-400 text-xs">Total</span>
                                    <span className="text-2xl font-bold text-white">${info.total}</span>
                                </div>
                                <div className='flex flex-col gap-5 border p-2 mt-5 border-slate-700 rounded-2xl'>
                                    <p className='font-semibold text-lg' >Editar Estado</p>
                                    <div className="flex gap-2 justify-evenly items-center flex-wrap">
                                        <button className="bg-yellow-700 px-4 py-1 rounded-2xl hover:bg-yellow-800 font-semibold" onClick={() => updateStatus(info.id, "pendiente")}>Pendiente</button>
                                        <button className="bg-blue-700 px-4 py-1 rounded-2xl hover:bg-blue-800 font-semibold" onClick={() => updateStatus(info.id, "pagado")}>Pagado</button>
                                        <button className="bg-green-700 px-4 py-1 rounded-2xl hover:bg-green-800 font-semibold" onClick={() => updateStatus(info.id, "entregado")}>Entregado</button>
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
    )
}

export default Pedidos