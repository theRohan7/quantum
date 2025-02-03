import { useState } from "react";
import axios from "axios";
import {BACKEND_URL} from "../constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";




const Auth = () => {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        DOB: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    

    const handleRegister = async(e) => {
        e.preventDefault(); 
        const {name, email, DOB, password} = formData;

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/register`, {name, email, DOB, password});
            if(response.status === 201){
                setError("");
                setIsRegister(false);
                setFormData({
                    name: "",
                    email: "",
                    DOB: "",
                    password: "",
                });
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        const {email, password} = formData;

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {email, password});
            if(response.status === 200){
                setError("");
                toast.success("Login successful");
                console.log(response.data);
                localStorage.setItem("token", response.data.data.token);
                navigate("/");

            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const toggleAuthMode = () => {
        setIsRegister(!isRegister);
        setError("");
        setFormData({
            name: "",
            email: "",
            DOB: "",
            password: "",
        });
    }

    return (
        <div className="main-container">
            <div className="left-part">
                <h1>Welcome to <br /> <span>Quantum Innovation</span> </h1>
            </div>
            <div className="right-part">
                <div className="auth-form">
                    <form>
                        <h1>{isRegister ? 'Register' : 'Login'}</h1>
                        {isRegister && (
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" value={formData.name} onChange={handleChange} placeholder="Name" name="name" />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={formData.email} onChange={handleChange} placeholder="Email" name="email" />
                        </div>
                        {isRegister && (
                            <div className="form-group">
                                <label htmlFor="DOB">DOB</label>
                                <input type="date" value={formData.DOB} onChange={handleChange} name="DOB" />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={formData.password} onChange={handleChange} placeholder="Password" name="password" />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button type="submit" onClick={isRegister ? handleRegister : handleLogin}>
                            {isRegister ? 'Register' : 'Login'}
                        </button>
                        <p onClick={toggleAuthMode} className="toggle-auth">
                            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;
