import { useState } from "react"


function Crear(){
    const [formData, setFormData] = useState({
        name:"",
        description: "",
        price: "",
        stock: "",
        category: "",
        image_url: ""
    })
    const [file, setFile] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const {name, value, files} = e.target 
        if (name === "image"){
            setFile(files[0])
        }else {
            setFormData((prev) => ({...prev, [name]: value}))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setIsCreating(true)
    
    try {
        const token = localStorage.getItem("token")
        let image_url_string = ""
        if (file) {
            const imageForm = new FormData()
            imageForm.append("file", file)
            const uploadAnswer = await fetch("https://api-funval-g6.onrender.com/upload/", {
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`},
                body: imageForm
            })
            if(!uploadAnswer.ok) throw new Error("Error al subir la image")
                const answerImg = await uploadAnswer.json()
                image_url_string = answerImg.url
        }
        const dataToSend = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price).toFixed(2).toString(),
            stock: parseInt(formData.stock),
            category: formData.category,
            image_url: image_url_string
        }
        console.log(dataToSend)
        const answer = await fetch("https://api-funval-g6.onrender.com/products/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataToSend)
        })
        if (answer.ok) {
            alert("Producto Creado Con Exito")
            setFormData({
                name:"",
                description: "",
                price: "",
                stock: "",
                category: "",
            })
            setFile(null)
            e.target.reset()
        }else{
            throw new Error ("Error al Guardar el Producto")
        }
    } catch (error){
        setError(error.message)
        console.log(error)
    }finally{
        setIsCreating(false)
    }
    }


    return(
        <main className="flex flex-col items-center justify-center p-5 sm:p-10 gap-10">
            <h1 className="text-4xl font-bold">Crear Nuevo Producto</h1>
            <form className="flex flex-col gap-5 p-5 rounded-2xl bg-slate-900 w-full sm:w-150" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-2">
                    <p className="font-bold">Nombre</p>
                    <input type="text" placeholder="Nombre del Producto" className="border p-3 w-full rounded-2xl" value={formData.name} required onChange={handleChange} name="name"/>
                </label>
                <label className="flex flex-col gap-2">
                    <p className="font-bold">Descripcion</p>
                    <input type="text" placeholder="Descripcion del producto" className="border p-3 w-full rounded-2xl" value={formData.description} required onChange={handleChange} name="description"/>
                </label>
                <label className=" flex flex-col gap-2">
                    <p className="font-bold">Precio</p>
                    <input type="number" placeholder="$0.00" className="border p-3 w-full rounded-2xl" value={formData.price} required onChange={handleChange} name="price"/>
                </label>
                <label className="flex flex-col gap-2">
                    <p className="font-bold">Cantidad</p>
                    <input type="number" placeholder="00" className="border p-3 w-full rounded-2xl" value={formData.stock} required onChange={handleChange} name="stock"/>
                </label>
                <label className=" flex flex-col gap-2">
                    <p className="font-bold">Categoria</p>
                    <input type="text" className="border p-3 w-full rounded-2xl" value={formData.category} required onChange={handleChange} name="category"/>
                </label>
                <label className="flex flex-col gap-2">
                    <p className="font-bold">Imagen</p>
                    <input type="file"className="border p-3 w-full rounded-2xl" onChange={handleChange} required name="image"/>
                </label>
                <button className="bg-[#155dfc] p-3 rounded-2xl font-bold text-xl">{isCreating ? "Cargando..." : "Crear"}</button>
            </form>
        </main>
    )
}

export default Crear