import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { userChecker } from "./userChecker";
const errorField = {
    borderStyle: "solid",
    borderColor: "#D93025"
}
const Login = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState('');
    const [emptyField, setEmptyfield] = useState([]);
    const [buttonLock, setButtonLock] = useState(false);
    const handleLogin = async (e) => {
        setButtonLock(true);
        e.preventDefault();
        const loginData = { userName, pass }
        const request = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
                //'Authorization':`Bearer ${user.token}`
            }
        })
        const response = await request.json();
        //console.log(response);
        const getUser = await userChecker(response)
        console.log(response)
        if (!response.msg) {
            setError("");
            setEmptyfield([]);
            localStorage.setItem('user', JSON.stringify(response));
            context.dispatch({ type: 'login', payload: response })
            context.dispatch({ type: 'setUser', payload: getUser })
            navigate('/news');
        }
        else {
            setError(response);
            setEmptyfield(response.emptyFields);
        }
        setButtonLock(false)
        // const test=userChecker();
        // console.log(test);
    }
    return (
        <div>
            <div style={{ backgroundColor: '#f1f1f1', height: '100vh' }}>
                <div className="container d-flex justify-content-center" style={{ backgroundColor: '#f1f1f1' }}>
                    <form onSubmit={handleLogin}>
                        <div className='row pt-5 d-flex justify-content-center' style={{ backgroundColor: 'white', width: '700px', marginTop: '100px' }}>
                            <h2 className="col-10 pb-4" style={{ fontSize: "36px" }}><b>Log In</b></h2>
                            <div className="form-floating col-10 mb-4">
                                <input
                                    type="text"
                                    className="form-control ps-3"
                                    style={emptyField.includes('userName') ? errorField : {}}
                                    placeholder=""
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                ></input>
                                <label className="ms-3" style={emptyField.includes('userName') ? { color: '#D93025' } : {}}>Enter your username</label>
                            </div>
                            <div className="form-floating col-10" >
                                <input
                                    type="password"
                                    className="form-control ps-3"
                                    style={emptyField.includes('pass') ? errorField : {}}
                                    placeholder=""
                                    value={pass}
                                    onChange={e => setPass(e.target.value)}
                                ></input>
                                <label className="ms-3" style={emptyField.includes('pass') ? { color: '#D93025' } : {}}>Enter your password</label>
                            </div>
                            <div className="col-10 mt-3">
                                {error &&
                                    <div className="ps-2" style={{ height: '40px', color: '#D93025' }}>
                                        {error.msg}
                                    </div>}
                                <div className="mt-1 ms-2">
                                    Don't have an account? <Link to="/signup">Create an account</Link>
                                </div>
                            </div>
                            <div className="col-10 pt-4 pb-5 d-flex justify-content-end" style={{ paddingRight: '10px' }}>
                                {!buttonLock && <button
                                    type='submit'
                                    className="btn btn-outline-primary px-3 py-2"><b>Log In</b></button>}
                                {buttonLock && <button
                                    className="btn btn-outline-primary px-3 py-2" disabled><b>Loggin In</b></button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;