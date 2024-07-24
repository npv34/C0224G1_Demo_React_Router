import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import UserService from "../../../services/user.service";
import {CircularProgress} from "@mui/material";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [process, setProcess] = useState(false)

    useEffect(() => {
        setProcess(true)
        UserService.getAllUsers().then(res => {
            setUsers(res.data);
            setProcess(false);
        })
    }, [loading]);

    const deleteUser = (id) => {
        // Delete user logic goes here
        if (window.confirm('Are you sure you want to delete')) {
            setProcess(true)
            UserService.destroyUser(id).then(() => {
                setLoading(!loading);
            })
        }

    }

    return (
        <>
            <div className="card mt-2">
                <div className="card-header">
                    User list
                    <Link to={"/admin/users/create"} className="btn btn-primary float-end">Add user</Link>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Dob</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { process ? (
                            <tr>
                                <td colSpan={5}><CircularProgress/></td>
                            </tr>
                        ) : users.map((user, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.dob}</td>
                                <td>
                                    <Link to={`/admin/users/${user.id}/edit`} className="btn btn-primary">Edit</Link>
                                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UserList;