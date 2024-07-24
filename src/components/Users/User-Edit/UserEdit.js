import {Link, useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import UserService from "../../../services/user.service";
import {LoadingButton} from "@mui/lab";



function UserEdit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [showLoadingButton, setShowLoadingButton] = useState(false)

    useEffect(() => {
        UserService.findUserById(id).then((res) => {
            formEditUser.setValues({
                name: res.data.name,
                email: res.data.email,
                dob: res.data.dob
            })
        })
    }, [])

    const formEditUser = useFormik({
        initialValues: {
            name: '',
            email: '',
            dob: ''
        },
        onSubmit: (values) => {
            setShowLoadingButton(true);
            UserService.updateUser(id, values).then((res) => {
                navigate("/admin/users")
            })
        }
    })

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Add new user
                </div>
                <div className="card-body">
                    <form onSubmit={formEditUser.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Name</label>
                            <input type="text" value={formEditUser.values.name} onChange={formEditUser.handleChange} className="form-control" id=""
                                   name="name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Email address</label>
                            <input type="email"  value={formEditUser.values.email} name={"email"} onChange={formEditUser.handleChange}
                                   className="form-control" id=""
                                   placeholder="name@example.com"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Dob</label>
                            <input type="date" name={"dob"}  value={formEditUser.values.dob} onChange={formEditUser.handleChange} className="form-control"
                                   id=""/>
                        </div>
                        <div>
                            {showLoadingButton ? (
                                <LoadingButton loading variant="contained">
                                    Submit
                                </LoadingButton>
                            ): (
                                <button type="submit" className="btn btn-primary">Submit</button>
                            )}

                            <Link to={"/admin/users"} className="btn btn-secondary">Back</Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserEdit;