import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Register = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const navigate = useNavigate();

    const isValidate = () => {
        let isProceed = true;
        let errorMessage = 'Isi dengan benar ';
        if (id === null || id === '') {
            isProceed = false;
            errorMessage += ' Username,';
        }
        if (name === null || name === '') {
            isProceed = false;
            errorMessage += ' Nama,';
        }
        if (password === null || password === '') {
            isProceed = false;
            errorMessage += ' Password,';
        }
        if (email === null || email === '') {
            isProceed = false;
            errorMessage += ' Email,';
        }
        if (phoneNumber === null || phoneNumber === '') {
            isProceed = false;
            errorMessage += ' Nomor Telefon,';
        }
        if (homeAddress === null || homeAddress === '') {
            isProceed = false;
            errorMessage += ' Alamat,';
        }
        if (postalCode === null || postalCode === '') {
            isProceed = false;
            errorMessage += ' Kode pos';
        }

        if (!isProceed) {
            MySwal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: errorMessage,
            });
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                isProceed = false;
                MySwal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Tolong masukkan email dengan benar',
                });
            }
        }
        return isProceed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let regObj = { id, name, password, email, phoneNumber, homeAddress, postalCode };
        if (isValidate()) {
            fetch("http://localhost:44308/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regObj),
            })
            .then((res) => {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Berhasil Register',
                });
                navigate('/login');
            })
            .catch((err) => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed: ' + err.message,
                });
            });
        }
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Registrasi</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>User Name (ID) <span className="errmsg">*</span></label>
                                        <input value={id} onChange={e => setId(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Nama <span className="errmsg">*</span></label>
                                        <input value={name} onChange={e => setName(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Nomor Telefon <span className="errmsg">*</span></label>
                                        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Alamat <span className="errmsg">*</span></label>
                                        <input value={homeAddress} onChange={e => setHomeAddress(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Kode Pos <span className="errmsg">*</span></label>
                                        <input value={postalCode} onChange={e => setPostalCode(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
