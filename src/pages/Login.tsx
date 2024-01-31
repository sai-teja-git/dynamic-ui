import { useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate()

    function verifyUser() {
        navigate("/pages/form-constructor")
    }

    return (
        <>
            <div className="login-center">
                <button className="btn btn-outline-secondary ms-3" onClick={verifyUser}>Login</button>
            </div>
        </>
    )
}