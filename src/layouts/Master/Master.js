import {Outlet, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import {useSelector} from "react-redux";
import {useEffect} from "react";

function Master() {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    const darkMode = useSelector(state => state.darkMode);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/login")
        }
    }, [auth])

    return (
        <>
            <div className={darkMode.isDarkMode ? "container-full bg-dark" : "container-full"}>
                <div className="container">
                    <div >
                        <Header/>
                        <Outlet/>
                        <h5>Day la footer</h5>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Master;