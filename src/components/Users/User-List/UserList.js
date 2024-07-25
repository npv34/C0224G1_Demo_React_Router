import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import UserService from "../../../services/user.service";
import {CircularProgress, FormControlLabel, Switch} from "@mui/material";
import {useSelector} from "react-redux";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [process, setProcess] = useState(false);
    const [showActions, setShowActions] = useState(false)
    const darkMode = useSelector(state => state.darkMode);

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

    const handleChange = (user, e) => {
        user.status = !user.status
        UserService.updateUser(user.id, user).then(() => {
            setLoading(!loading);
        })
    }
    return (
        <>
            <div className={darkMode.isDarkMode ? "card mt-2 bg-dark text-white" : "card mt-2 text-dark" }>
                <div className="card-header">
                    User list
                    <Link to={"/admin/users/create"} className="btn btn-primary float-end">Add user</Link>
                </div>
                <div className="card-body">
                    <table  className={darkMode.isDarkMode ? "table bg-dark text-white" : "table text-dark" } >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Dob</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { process ? (
                            <tr>
                                <td colSpan={5}><CircularProgress/></td>
                            </tr>
                        ) : users.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.dob}</td>
                                <td><FormControlLabel control={<Switch checked={user.status} onChange={(e) => handleChange(user, e)} />} label={user.status ? "Active" : "Disable"} /></td>
                                <td>
                                    { showActions && (
                                        <>
                                            <Link to={`/admin/users/${user.id}/edit`} className="btn btn-primary">Edit</Link>
                                            <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                        </>
                                    )}
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