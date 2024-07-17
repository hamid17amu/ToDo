import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import TodoContext from '../context/todos/TodoContext';

const Signup = () => {
    const context = useContext(TodoContext);
    const {showAlert}=context;
    const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword:""});

    useEffect(() => {
      if(localStorage.getItem('token')){
        nav("/");
      }
      // eslint-disable-next-line
    }, [])

    const onChange = ({ target }) => {
      setCred({ ...cred, [target.name]: target.value });
    };
    
    let nav = useNavigate();

    const host = process.env.REACT_APP_HOST;
    const handleSubmit = async (e) => {
      e.preventDefault();

      if(cred.password!==cred.cpassword){
        return showAlert("Password and Confirm Password must be same", "danger");
      }

      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cred.name,
          email: cred.email,
          password: cred.password,
        }),
      });
    
      const json = await response.json();
    //   console.log(json);
    
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        nav("/");
        showAlert("Welcome to iNotes", "success");
      } else {
        showAlert(json.error, "danger");
      }
    };    

  return (
<div className='mt-3'>
    <h2>Signup to your ToDo-APP</h2>
    <form  onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={cred.name} onChange={onChange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={cred.email} onChange={onChange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={cred.password} onChange={onChange}/>
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' value={cred.cpassword} onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-primary">Signup</button>
    </form>
  </div>  )
}

export default Signup