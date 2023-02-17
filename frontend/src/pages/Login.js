import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginFetch } from '../Endpoints';

import { customToast, customToastContainer } from '../components/CustomAlert';
import { FaSignInAlt } from 'react-icons/fa';
import '../styles/RegisterLogin.css';

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const data = await loginFetch(formData);
        if(data.token) {
            localStorage.setItem('token', data.token);
            navigate('/');
        } else {
            customToast(data.message, 'error');
        }
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,  // spread operator to split the object into its parts
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className='container'>
            <div class="loginBody">
                <div class="login-wrapper">
                    <section className="heading">
                        <h1><FaSignInAlt /> Login</h1>
                        <h2 className='h2'>Please login</h2>
                    </section>
                    <form class="login-form" onSubmit={loginUser}>
                        <div class="input-group">
                            <input
                                className="input"
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                placeholder="Email"
                                onChange={onChange}
                            />
                        </div>
                        <div class="input-group">
                            <input
                                className="input"
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                placeholder="Password"
                                onChange={onChange}
                            />
                        </div>
                        <button type="submit" className='button'>Login</button>
                        <div>Don't have an account? <Link to="/register" className='a'>Click here!</Link></div>
                    </form>
                </div>
                {customToastContainer()}
            </div>
        </div>
    );
}

export default Login;