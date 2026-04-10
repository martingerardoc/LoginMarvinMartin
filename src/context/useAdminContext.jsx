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

    const fetchPedidos = async () => {
        const token = localStorage.getItem("token")
        try{
            const answer = await fetch("https://api-funval-g6.onrender.com/orders/",{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await answer.json()
            setPedidos(data)
        }catch(error){
            console.log(error)
        }
    }

    const deleteProduct = async (id) => {
        const token = localStorage.getItem("token")
        try{
            const response = await fetch(`https://api-funval-g6.onrender.com/products/${id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })
            if (response.ok) {
                setProducts(prevProducts => prevProducts.filter(p => p.id !== id))
                alert("Producto eliminado")
            }else{
                alert("Error al eliminar el producto")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchPedidos()
    },[])

    return(
        <AdminContext.Provider value={{pedidos,setPedidos, products, setProducts, deleteProduct, nombre, fetchProducts, fetchPedidos}}>
            {children}
        </AdminContext.Provider>
    )
}