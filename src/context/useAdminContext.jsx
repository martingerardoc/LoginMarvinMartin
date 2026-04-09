import { createContext, useContext, useEffect, useState } from "react";

export const AdminContext = createContext()

export const AdminProvider = ({children}) => {
    const [pedidos, setPedidos] = useState([])
    const nombre = localStorage.getItem("username")
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try{
            const response = await fetch("https://api-funval-g6.onrender.com/products/?skip=0&limit=200")
            const data = await response.json()
            setProducts(data)
        }catch (error){
            console.log("Something went wrong: ", error)
        }
    }
    useEffect(() => {
        fetchProducts()
    },[])

    return(
        <AdminContext.Provider value={{pedidos,setPedidos, products, setProducts, nombre}}>
            {children}
        </AdminContext.Provider>
    )
}