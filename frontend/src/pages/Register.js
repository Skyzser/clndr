import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerFetch } from '../Endpoints';

import { customToast, customToastContainer } from '../components/CustomAlert';
import { FaUser } from 'react-icons/fa';
import '../styles/RegisterLogin.css';

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPass: ""
    });

    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPass) {
            customToast("Passwords do not match!", 'error');
            navigate('/register');
        } else {
            const data = await registerFetch(formData);
            if(data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                customToast(data.message, 'error');
            }
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
                        <h1><FaUser /> Register</h1>
                        <h2 className='h2'>Please create an account</h2>
                    </section>
                    <form class="login-form" onSubmit={registerUser}>
                        <div class="input-group">
                            <input
                                className="input"
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                placeholder="Username"
                                onChange={onChange}
                            />
                        </div>
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
                        <div class="input-group">
                            <input
                                className="input"
                                type="password"
                                id="confirmPass"
                                name="confirmPass"
                                value={formData.confirmPass}
                                placeholder="Confirm Password"
                                onChange={onChange}
                            />
                        </div>
                        <button type="submit" className='button'>Register</button>
                        <div>Already have an account? <Link to="/login" className='a'>Click here!</Link></div>
                    </form>
                </div>
                {customToastContainer()}
            </div>
        </div>
    );
}

/*
<section className="heading">
    <h1><FaUser /> Register</h1>
    <p>Please create an account</p>
</section>

<section className="form">
    <form onSubmit={registerUser}>
        <div className="form-group">
            <input 
                type="text" 
                className="form-control" 
                id="username" 
                name="username" 
                value={formData.username} 
                placeholder="Username" 
                onChange={onChange}
            />
        </div>
        <div className="form-group">
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={onChange}
            />
        </div>
        <div className="form-group">
            <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={onChange}
            />
        </div>
        <div className="form-group">
            <input
                type="password"
                className="form-control"
                id="confirmPass"
                name="confirmPass"
                value={formData.confirmPass}
                placeholder="Confirm Password"
                onChange={onChange}
            />
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-block">Register</button>
        </div>
    </form>
    {customToastContainer()}
</section>
*/

export default Register;