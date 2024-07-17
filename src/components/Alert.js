import React, {useContext} from 'react'
import TodoContext from '../context/todos/TodoContext'

function Alert(props) {
    const context = useContext(TodoContext);
    const {alert} = context;
    const capt=(word)=>{
        if(word==="danger") word = "error"
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    alert && <div>
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
    <strong>{capt(alert.type)}</strong> {alert.msg}
    {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
  </div>
  </div>
  )
}

export default Alert