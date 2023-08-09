/* eslint-disable react-refresh/only-export-components */
import { useNavigate, Form, useActionData } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function action({ request }) {
    const formData = await request.formData()

    const datos = Object.fromEntries(formData)

    const errores = []
    if (Object.values(datos).includes("")) {
        errores.push("Todos los campos son obligatorios")
    }
    if (Object.keys(errores).length) {
        return errores
    }
}

function NuevoCliente() {
    const navigate = useNavigate()
    const errores = useActionData()

    console.log(errores)
    return (
        <>
            <h1 className=" font-black text-4xl text-blue-900">Nuevo Cliente</h1>
            <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>
            <div className="flex justify-end">
                <button
                    onClick={() => navigate(-1)}
                    className=" bg-blue-800 px-3 py-1 text-white font-bold uppercase">
                    volver
                </button>
            </div>
            <div className=" bg-white shadow rounded-md md:3/4 mx-auto px-5 py-10 mt-20">

                {
                    errores?.length && errores.map((error, index) => (
                        <Error key={index}>{error}</Error>
                    ))
                }
                <Form
                    method="post"
                >
                    <Formulario />
                    <input
                        type="submit"
                        className=" mt-5 w-full p-3 uppercase text-white text-lg font-bold bg-blue-800"
                        value="Registrar Cliente"
                    />
                </Form>
            </div>
        </>
    )
}

export default NuevoCliente
