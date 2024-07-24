import {Outlet} from "react-router-dom";
import Header from "../Header/Header";

function Master() {
    return (
        <>
            <div className="container">
                <Header/>
                <Outlet/>
                <h5>Day la footer</h5>
            </div>
        </>
    )
}

export default Master;