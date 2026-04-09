import { useContext } from "react"
import { AdminContext } from "../context/useAdminContext"

function Productos (){
    const {products} = useContext(AdminContext)
    return(
        <main className="flex flex-col items-center justify-center p-5 sm:p-10 gap-10">
            <h1 className="text-4xl font-bold">Actualizar Producto Existente</h1>
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
                {products.map((product, index) => {console.log(product, index) 
                        return ( 
                <article className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 cursor-pointer flex flex-col gap-2 relative" key={index}>
                    <img className="rounded-2xl w-full h-75 object-cover" src={product.image_url ? product.image_url : "/photo.png"} alt={product.name} />
                    <h2 className="font-bold text-lg">{product.name}</h2>
                    <p><span className="font-bold">Price: </span> ${product.price}</p>
                    <p><span className="font-bold">Stock: </span>{product.stock}</p>
                    <p><span className="font-bold">Categoria: </span>{product.category}</p>
                    <p className="font-bold text-2xl absolute bg-blue-600 rounded-full px-2 right-8 top-8">{index+1}</p>
                    <div className="flex gap-5 items-center justify-center mt-5">
                        <button className="bg-green-700 px-4 py-1 rounded-2xl hover:bg-green-800 font-semibold">Editar</button>
                        <button className="bg-red-700 px-4 py-1 rounded-2xl hover:bg-red-800 font-semibold">Eliminar</button>
                    </div>
                </article>
                )})}
            </section>
            {/*<form className="flex flex-col gap-5 p-5 rounded-2xl bg-slate-900 w-full sm:w-150">
                <label className="flex flex-col gap-2">
                    <p className="font-bold">Nombre</p>
                    <input type="text" placeholder="Nombre del Producto" className="border p-3 w-full rounded-2xl"/>
                </label>
                <label className="flex flex-col gap-2">
                    <p className="font-bold">Descripcion</p>
                    <input type="text" placeholder="Descripcion del producto" className="border p-3 w-full rounded-2xl"/>
                </label>
                <label className=" flex flex-col gap-2">
                    <p className="font-bold">Precio</p>
                    <input type="text" placeholder="$0.00" className="border p-3 w-full rounded-2xl"/>
                </label>
                <label className="flex flex-col gap-2">
                    <p className="font-bold">Cantidad</p>
                    <input type="text" placeholder="00" className="border p-3 w-full rounded-2xl"/>
                </label>
                <label className=" flex flex-col gap-2">
                    <p className="font-bold">Categoria</p>
                    <input type="text" className="border p-3 w-full rounded-2xl"/>
                </label>
                <label className="flex flex-col gap-2">
                    <p className="font-bold">Imagen</p>
                    <input type="file"className="border p-3 w-full rounded-2xl"/>
                </label>
            </form>*/}
        </main>
    )
}

export default Productos