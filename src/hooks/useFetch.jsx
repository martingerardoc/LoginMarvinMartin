import { useState,useEffect } from "react";

export default function useFetch(url, setPedidos) {
    const [data ,setData]=useState([])
    const [loading ,setLoading]=useState(false)
    const [error,setError]=useState("")

    useEffect(() => {
        async function traerData() {
            setLoading(true)
            const token = localStorage.getItem("token")
            try {
                const res = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                })
            const data = await res.json()
            setPedidos(data)
            }catch (error){
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        if(url && setPedidos)traerData()
    }, [url, setPedidos])
    return{ loading, error}
}