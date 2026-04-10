import { useContext, useState } from "react"
import { AdminContext } from "../context/useAdminContext"
import Editar from "../components/Editar"


function Productos (){
    const {products, deleteProduct, fetchProducts} = useContext(AdminContext)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleEdit = (product) => {
        setSelectedProduct(product)
        setIsEditOpen(true)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleDelete = (id, nombre) => {
        const confirm = window.confirm("Estas seguro que quieres eliminar el producto?")
        if (confirm) {
            deleteProduct(id)
        }
    }

    return(
        <main className="flex flex-col items-center justify-center p-5 sm:p-10 gap-10">
            <Editar
                isOpen={isEditOpen}
                product={selectedProduct}
                onClose={() => setIsEditOpen(false)}
                onRefresh={fetchProducts}
            />
            <h1 className="text-4xl font-bold">Gestinar Productos</h1>
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
                {products.map((product, index) => {
                        return ( 
                <article className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 cursor-pointer flex flex-col gap-2 relative" key={index}>
                    <img className="rounded-2xl w-full h-75 object-cover" loading="lazy" src={product.image_url ? product.image_url : "/photo.png"} alt={product.name} />
                    <h2 className="font-bold text-lg">{product.name}</h2>
                    <p><span className="font-bold">Price: </span> ${product.price}</p>
                    <p><span className="font-bold">Stock: </span>{product.stock}</p>
                    <p><span className="font-bold">Categoria: </span>{product.category}</p>
                    <p className="font-bold text-2xl absolute bg-blue-600 rounded-full px-2 right-8 top-8">{index+1}</p>
                    <div className="flex gap-5 items-center justify-center mt-5">
                        <button className="bg-green-700 px-4 py-1 rounded-2xl hover:bg-green-800 font-semibold" onClick={() => handleEdit(product)}>Editar</button>
                        <button className="bg-red-700 px-4 py-1 rounded-2xl hover:bg-red-800 font-semibold" onClick={() => handleDelete(product.id, product.name)}>Eliminar</button>
                    </div>
                </article>
                )})}
            </section>
        </main>
    )
}

export default Productos