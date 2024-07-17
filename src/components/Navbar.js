import React, {useContext} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import TodoContext from '../context/todos/TodoContext';

const Navbar = () => {
  const context = useContext(TodoContext);
  const {showAlert}=context;

  let location = useLocation();
  let nav = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('token');
    nav("/login");
    showAlert("You've logged out of your account!", "success")
  }

  return (
    <div><nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">ToDo App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
        </ul>
        {!localStorage.getItem('token') &&<form className="d-flex" role="search">
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
        </form>}
        {localStorage.getItem('token') &&<form className="d-flex" role="search">
        {/* <Link className='btn btn-primary' to="/profile">Profile</Link> */}
        <Link className='btn btn-primary mx-2' to="/changepass">Change Password</Link>
        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        </form>}
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar