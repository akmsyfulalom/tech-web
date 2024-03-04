/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import { AuthContext, dispatch } from "./context/authContext";
const Navbar=()=>{
    const navigate=useNavigate();
    const context=useContext(AuthContext);
    const logout=()=>{
      localStorage.removeItem("user");
      context.dispatch({type:'logout',payload:null});
      //navigate("/login");
    }
    return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container collapse navbar-collapse d-flex justify-content-end">
    <ul className="navbar-nav">
      <li className="nav-item">
      <Link to='/' className='nav-link ps-3'>Home</Link>
      </li>
      <li className="nav-item">
      <Link to='/addJob' className='nav-link ps-3'>Add Job</Link>
      </li>
      <li className="nav-item">
      <Link to='/products' className='nav-link ps-3'>Products</Link>
      </li>
      <li className="nav-item">
      <Link to='/news' className='nav-link ps-3'>News</Link>
      </li>
      <li className="nav-item">
      <Link to='/news/manage-news' className='nav-link ps-3'>Manage News</Link>
      </li>
      <li className="nav-item dropdown" style={{cursor:'pointer'}}>
      {context.user===null ? 
        <Link to='/login' className='nav-link ps-3'>Log In</Link>:
      <div>
      <div className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {context.user.userName}
        </div>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <div className="dropdown-item" onClick={logout}>Logout</div>
        </div>
      </div>
        }
      </li>
    </ul>
  </div>
</nav>
    )
}
export default Navbar;