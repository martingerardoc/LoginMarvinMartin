function Actualizar (){
    return(
        <main className="flex flex-col items-center justify-center p-5 sm:p-10 gap-10">
            <h1 className="text-4xl font-bold">Actualizar Producto Existente</h1>
            <form className="flex flex-col gap-5 p-5 rounded-2xl bg-slate-900 w-full sm:w-150">
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
            </form>
        </main>
    )
}

export default Actualizar