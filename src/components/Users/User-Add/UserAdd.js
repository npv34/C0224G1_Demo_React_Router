import {useFormik} from "formik";
import UserService from "../../../services/user.service";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function UserAdd() {
    const navigate = useNavigate();

    const formAddUser = useFormik({
        initialValues: {
            name: '',
            email: '',
            dob: ''
        },
        onSubmit: (values) => {
            UserService.createUser(values).then(res => {
                navigate("/admin/users")
            }).catch(err => {
                toast.error(err.message)
            })
        }
    })

    return (
        <>
            <div className="card">
                <div className="card-header">
                    Add new user
                </div>
                <div className="card-body">
                    <form onSubmit={formAddUser.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Name</label>
                            <input type="text" onChange={formAddUser.handleChange} className="form-control" id="" name="name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Email address</label>
                            <input type="email" name={"email"} onChange={formAddUser.handleChange} className="form-control" id=""
                                   placeholder="name@example.com"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Dob</label>
                            <input type="date"  name={"dob"} onChange={formAddUser.handleChange} className="form-control" id=""/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={"/admin/users"} className="btn btn-secondary">Back</Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default UserAdd;