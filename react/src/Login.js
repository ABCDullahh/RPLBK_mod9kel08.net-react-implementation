import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';

const MySwal = withReactContent(Swal);

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const props = useSpring({ opacity: 1, from: { opacity: 0 } });

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            MySwal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please Enter Username',
            });
        }
        if (password === '' || password === null) {
            result = false;
            MySwal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please Enter Password',
            });
        }
        return result;
    }

    const proceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:44308/user/" + username)
                .then((res) => res.json())
                .then((resp) => {
                    if (Object.keys(resp).length === 0) {
                        MySwal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please Enter a valid username',
                        });
                    } else {
                        if (resp.password === password) {
                            MySwal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Login successful!',
                            });
                            sessionStorage.setItem('username', username);
                            sessionStorage.setItem('userrole', resp.role);
                            navigate('/');
                        } else {
                            MySwal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Please Enter valid credentials',
                            });
                        }
                    }
                })
                .catch((err) => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Login Failed due to :' + err.message,
                    });
                });
        }
    }

    return (
        <div className="row" style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <animated.div style={{ ...props, width: '25%' }}>
                <form onSubmit={proceedLogin} className="container">
                    <div className="card">
                        <div className="card-header" style={{ backgroundColor: '#007bff', color: '#fff' }}>
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label><FontAwesomeIcon icon={faUser} /> User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label><FontAwesomeIcon icon={faLock} /> Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                            </div>
                        </div>
                        <div className="card-footer" style={{ textAlign: 'center' }}>
                            <button type="submit" className="btn btn-primary">Login</button>
                            <Link className="btn btn-success" to={'/register'} style={{ marginLeft: '1%' }}>Register</Link>
                        </div>
                    </div>
                </form>
            </animated.div>
        </div>
    );
}

export default Login;
