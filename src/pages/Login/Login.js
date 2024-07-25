import "./Login.css";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setUserLogin} from "../../redux/features/auth/authSlice";

const loginSchema = Yup.object().shape({
    email: Yup.string()
       .email("Invalid email address")
       .required("Email is required"),
    password: Yup.string()
       .required("Password is required"),
});

function Login(props) {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();


    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            const  {email, password} = values;
            // xu ly logic
            if (email == "admin@gmail.com" && password == "1234") {
                // dieu huog router
                let user = {
                    email: email,
                    password: password
                }
                // goi dispatch
                dispatch(setUserLogin(user))

                navigate("/admin/users")
            } else {
                toast.error("Tai khoan hoac mat khau khong dung!");
                return; // stop form submit
            }
        }
    })


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className="container d-flex justify-content-center">
                <div className="form-signin text-center mt-5">
                    <form onSubmit={loginForm.handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <div className="mb-2">
                            <TextField
                                fullWidth
                                required
                                name={"email"}
                                id="outlined-required"
                                label="Email"
                                error={!!loginForm.errors.email}
                                onChange={loginForm.handleChange}
                                helperText={loginForm.errors.email}
                            />
                        </div>
                        <div className="mb-2">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput

                                    id="outlined-adornment-password"
                                    name={"password"}
                                    onChange={loginForm.handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!loginForm.errors.password}
                                    helperText={loginForm.errors.password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>

                        <div className="checkbox mb-2">
                            <label>
                                <input type="checkbox" name={"rememberMe"} onChange={loginForm.handleChange} value="remember-me"/> Remember me
                            </label>
                        </div>
                        <div className="mb-2">
                            <Button size="large" disabled={!loginForm.isValid} fullWidth type={"submit"} variant="contained">Sign in</Button>
                        </div>
                        <Link to={"/register"}>
                            <small>Regitser</small>
                        </Link>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;