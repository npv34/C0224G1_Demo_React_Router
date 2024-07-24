import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Master from "./layouts/Master/Master";
import UserList from "./components/Users/User-List/UserList";
import UserAdd from "./components/Users/User-Add/UserAdd";
import UserEdit from "./components/Users/User-Edit/UserEdit";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>

            <Route path={"/admin"} element={<Master/>}>
                <Route path={"users"} element={<UserList/>}/>
                <Route path={"users/create"} element={<UserAdd/>}/>
                <Route path={"users/:id/edit"} element={<UserEdit/>}/>
            </Route>

            <Route path="*" element={<h1>Page not found</h1>}/>
        </Routes>
        <ToastContainer />
    </>
  );
}

export default App;
