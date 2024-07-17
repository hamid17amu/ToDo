import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import TodoContext from '../context/todos/TodoContext';

const Login = () => {
  const context = useContext(TodoContext);
  const {showAlert}=context;

    const [cred, setCred] = useState({oldpass: "", newpassword:"", cpassword:""})


    const onChange = ({ target }) => {
        setCred({ ...cred, [target.name]: target.value });
      };

    let nav = useNavigate();

    const host = "http://localhost:5000";
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/changepassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token')
            },
            body: JSON.stringify({oldPass: cred.oldpass, newPass: cred.newpassword}), 
        });

        const json = await response.json();
        // console.log(json);

        if(json.success){
        localStorage.setItem('token', json.authToken);
        nav("/");
        showAlert("Password change successfull", "success");

        }
        else{
        showAlert("Invalid Credentials", "danger");
        }
              
    }
  return (
    <div className='mt-3'>
        <h2>Change Password</h2>
    <form className='my-4'  onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Old Password</label>
    <input type="password" className="form-control" id="oldpass" name='oldpass' aria-describedby="emailHelp" value={cred.oldpass} onChange={onChange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
    <input type="password" className="form-control" id="newpassword" name='newpassword' value={cred.newpassword} onChange={onChange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' value={cred.cpassword} onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default Login