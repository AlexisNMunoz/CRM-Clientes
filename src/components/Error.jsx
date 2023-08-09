/* eslint-disable react/prop-types */

function Error({ children }) {
    return (
        <div className=" text-center my-4 bg-red-600 font-bold uppercase text-white p-2">
            {children}
        </div>
    )
}

export default Error
