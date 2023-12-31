/* eslint-disable no-control-regex */
/* eslint-disable react-refresh/only-export-components */
import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/clientes"

export async function action({ request }) {
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

    await agregarCliente(datos)

    return redirect("/")
}

function NuevoCliente() {
    const navigate = useNavigate()
    const errores = useActionData()
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
                    noValidate
                >
                    <Formulario />
                    <input
                        type="submit"
                        className=" mt-5 w-full p-3 uppercase text-white text-lg font-bold bg-blue-800 hover:bg-blue-500 cursor-pointer"
                        value="Registrar Cliente"
                    />
                </Form>
            </div>
        </>
    )
}

export default NuevoCliente
