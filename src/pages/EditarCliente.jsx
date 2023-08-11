/* eslint-disable no-control-regex */
/* eslint-disable react-refresh/only-export-components */
import { obtenerCliente, actualizarCliente } from "../data/clientes"
import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({ params }) {
    const cliente = await obtenerCliente(params.clienteId)

    if (Object.values(cliente).length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "Cliente no encontrado"
        })
    }

    return cliente
}

export async function action({ request, params }) {
    const formData = await request.formData()

    const datos = Object.fromEntries(formData)
    const email = formData.get("email")

    const errores = []
    if (Object.values(datos).includes("")) {
        errores.push("Todos los campos son obligatorios")
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\\.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");

    if (!regex.test(email)) {
        errores.push("El email es incorrecto")
    }

    if (Object.keys(errores).length) {
        return errores
    }

    //Actualizar Cliente

    await actualizarCliente(params.clienteId, datos)
    return redirect("/")
}

function EditarCliente() {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()
    return (
        <>
            <h1 className=" font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">Modifica los datos necesarios del cliente</p>
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
                    noValidate
                >
                    <Formulario
                        cliente={cliente}
                    />
                    <input
                        type="submit"
                        className=" mt-5 w-full p-3 uppercase text-white text-lg font-bold bg-blue-800 hover:bg-blue-500 cursor-pointer"
                        value="Actualizar Datos"
                    />
                </Form>
            </div>
        </>
    )
}

export default EditarCliente
