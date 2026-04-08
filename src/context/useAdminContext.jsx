import { createContext, useContext, useState } from "react";

export const AdminContext = createContext()

export const AdminProvider = ({children}) => {
    const [pedidos, setPedidos] = useState([])
    const nombre = localStorage.getItem("username")

    return(
        <AdminContext.Provider value={{pedidos,setPedidos, nombre}}>
            {children}
        </AdminContext.Provider>
    )
}