import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Home = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editUser, setEditUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Fetch user data from the server
        // Replace the URL and headers with your API endpoint and authentication logic
        fetch("http://localhost:44308/user/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("jwttoken"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserList(data);
                setLoading(false);

                Swal.fire({
                    icon: "success",
                    title: `Berhasil Login!`,
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setLoading(false);
            });
    }, []);

    const handleEdit = (userId) => {
        const userToEdit = userList.find((user) => user.id === userId);
        setEditUser(userToEdit);
        setShowEditModal(true);
        setShowPassword(false);
    };

    const closeEditModal = () => {
        setEditUser(null);
        setShowEditModal(false);
    };

    const handleEditSubmit = () => {
        // Update the user on the server
        fetch(`http://localhost:44308/user/${editUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("jwttoken"),
            },
            body: JSON.stringify(editUser),
        })
            .then((res) => res.json())
            .then((updatedUser) => {
                setUserList((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
                setShowEditModal(false);

                Swal.fire({
                    icon: "success",
                    title: "User Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                setShowEditModal(false);

                Swal.fire({
                    icon: "error",
                    title: "Error Updating User",
                    text: "An error occurred while updating the user.",
                });
            });
    };

    const handleEditCancel = () => {
        setEditUser(null);
        setShowEditModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleDelete = (userId) => {
        // Display SweetAlert for confirmation
        Swal.fire({
            icon: 'warning',
            title: 'Anda yakin?',
            text: `Akan menghapus akun dengan ID ${userId} ?`,
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform the delete operation on the server
                // After a successful deletion, update the user list and show a SweetAlert
                fetch(`http://localhost:44308/user/${userId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem("jwttoken"),
                    },
                })
                    .then(() => {
                        setUserList((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                        // Show SweetAlert for successful deletion
                        Swal.fire({
                            icon: "success",
                            title: "User Terhapus!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                        // Show SweetAlert for unsuccessful deletion
                        Swal.fire({
                            icon: "error",
                            title: "Error Deleting User",
                            text: "An error occurred while deleting the user.",
                        });
                    });
            }
        });
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Edit dan Delete Akun</h1>

            <div className="table-responsive">
                <table className="table table-bordered table-striped text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Nomor Telefon</th>
                            <th>Alamat</th>
                            <th>Kode pos</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{showPassword ? user.password : "********"}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.homeAddress}</td>
                                <td>{user.postalCode}</td>
                                <td>
                                    <button onClick={() => handleEdit(user.id)} className="btn btn-primary">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(user.id)} className="btn btn-danger ms-2">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showEditModal && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleEditCancel}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="editName">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editName"
                                            name="name"
                                            value={editUser?.name || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editEmail">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="editEmail"
                                            name="email"
                                            value={editUser?.email || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editPassword">Password</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="editPassword"
                                            name="password"
                                            value={editUser?.password || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editPhoneNumber">Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editPhoneNumber"
                                            name="phoneNumber"
                                            value={editUser?.phoneNumber || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editHomeAddress">Home Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editHomeAddress"
                                            name="homeAddress"
                                            value={editUser?.homeAddress || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editPostalCode">Postal Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editPostalCode"
                                            name="postalCode"
                                            value={editUser?.postalCode || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="button" className="btn btn-success" onClick={handleEditSubmit}>
                                        Save
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={handleEditCancel} style={{ marginLeft: '1%' }}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-info" onClick={toggleShowPassword} style={{ marginLeft: '1%' }}>
                                        {showPassword ? "Hide Password" : "Show Password"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
