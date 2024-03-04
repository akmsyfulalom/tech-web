/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import { AuthContext, dispatch } from "./context/authContext";
const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("user");
    context.dispatch({ type: 'logout', payload: null });
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container collapse navbar-collapse d-flex justify-content-end">
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link to='/' className='nav-link ps-3'>Home</Link>
          </li>
          <li className="nav-item">
            <Link to='/news' className='nav-link ps-3'>News</Link>
          </li>
          <li className="nav-item">
            <Link to='/user/productlist' className='nav-link ps-3'>Products</Link>
          </li>
          <li className="nav-item">
            <Link to='/career' className='nav-link ps-3'>Career</Link>
          </li>
          <li className="nav-item dropdown" style={{ cursor: 'pointer' }}>
            {context.user === null ?
              <Link to='/login' className='nav-link ps-3'>Log In</Link> :
              <div>
                <div className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {context.user.userName}
                </div>{context.userType === 'admin' ?
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to='/admin/career' className='dropdown-item'>Career</Link>
                    <Link to='/products' className='dropdown-item'>Products</Link>
                    <Link to='/news/manage-news' className='dropdown-item'>News</Link>

                    <div className="dropdown-item" onClick={logout}>Logout</div>
                  </div> :
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <div className="dropdown-item" onClick={logout}>Logout</div>
                  </div>
                }
              </div>
            }
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;