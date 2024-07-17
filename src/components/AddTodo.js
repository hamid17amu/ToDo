import React from 'react'
import {useState, useContext} from 'react';
import TodoContext from '../context/todos/TodoContext';


const AddTodo = () => {
    const context = useContext(TodoContext);
    const {addTodo} = context;
    const [todo, setTodo] = useState({date:"", task:""});

      const onChange = ({ target }) => {
        console.log(target.value);
        setTodo({ ...todo, [target.name]: target.value});
      };
    
  return (
    <div className='my-3'>
        <form onSubmit={(e)=>{
            e.preventDefault();
            addTodo(todo);
        }}>
        <div class="mb-3">
          <table className='mx-2'>
            <label for="task" className="form-label mx-2">Enter the task</label>
            <tr>
              <th scope="col" style={{ width: "87%" }}>
                <input type="text" onChange={onChange} className="form-control mx-2" id="inputTask" name="task"/>
              </th>
              <th scope="col">
                <input type="date" onChange={onChange} className="form-control mx-2" id="date" name="date"></input>
              </th>
              <th scope="col">
                <button type="submit" className="btn btn-primary mx-2">Submit</button>
              </th>
            </tr>
          </table>
        </div>
      </form>
    </div>
  )
}

export default AddTodo