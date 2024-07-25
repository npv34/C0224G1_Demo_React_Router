import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/features/auth/authSlice";
import DarkMode from "../../components/DarkMode/DarkMode";

function Header() {
    const auth = useSelector(state => state.auth);
    const dispatch  = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to={"/admin/users"} className="nav-link dropdown-toggle" href="#" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    User management
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={"/admin/users/create"}>User add</Link></li>
                                    <li><Link className="dropdown-item" to={"/admin/users"}>User list</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                { auth.isAuthenticated && (
                                    <>
                                        <a className="nav-link dropdown-toggle" role="button"
                                              data-bs-toggle="dropdown" aria-expanded="false">
                                            Xin chao: {auth.userLogin.email}
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                        </ul>
                                    </>
                                )}
                            </li>
                            <li className="nav-item">
                                <DarkMode/>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;