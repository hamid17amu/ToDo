import React from 'react'
import {useState, useEffect, useRef, useContext} from 'react';
import TodoContext from '../context/todos/TodoContext';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

const Todos = () => {
    const context = useContext(TodoContext);
    const {list ,getList, editTodo, getCompleted, getNotCompleted, load, opt, setOpt} = context;
    console.log(list);
    

    const nav = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
          getList();
        }
        else nav("/login");
        // eslint-disable-next-line
      }, [])
      
    const [eTodo, setETodo] = useState({id:"",date:"", task:"", Completed:0});

    const onEdit = ({ target }) => {
        console.log(target.value);
        setETodo({ ...eTodo, [target.name]: target.value});
      };

      
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateTodo = (e)=>{
        editTodo(eTodo);
        e.preventDefault();
        refClose.current.click();
    }


  return (
    <div>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit your ToDo</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="container my-3">
                        <form className='my-3'>
                            <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Task</label>
                            <input type="text" className="form-control" onChange={onEdit} id="task" name='task'  value={eTodo.task} minLength={3} required/>
                            </div>
                            <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Date</label>
                            <input type="date" className="form-control" onChange={onEdit} value={eTodo.date} id="date" name="date"/>
                            </div>
                        </form>
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={updateTodo} className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>



      <h1 className='mt-4 text-center align-middle'>Your ToDo List</h1>
      <table className='my-3'>
        <tr>
          <th className='col col-sm-1'>Filter: </th>
          <th><button className={`btn btn-${opt===1?"primary":"secondary"}`} onClick={()=>{setOpt(1); getList();}}> All</button></th>
          <th><button className={`btn btn-${opt===2?"primary":"secondary"}`} onClick={()=>{setOpt(2); getCompleted();}}> Completed</button></th>
          <th><button className={`btn btn-${opt===3?"primary":"secondary"}`} onClick={()=>{setOpt(3); getNotCompleted();}}> Not Completed</button></th>
          <th><Search/></th>
        </tr>
      </table>

      {list?.map((todo) => {
          return console.log(todo.Task);
        })}
        
      {!load && <div className='d-flex justify-content-center align-middle'><div className="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
          </div>
          </div>}
      <table className="table">
        <thead>
          <tr style={{backgroundColor:"red"}}>
            <th scope="col col-sm-2">Date</th>
            <th scope="col col-sm-4">Task</th>
            <th scope="col col-sm-4">Status</th>
            <th scope="col col-sm-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {list.length===0 && <h2 className='my-4' style={{textAlign:'center'}}> No ToDo Task has been Saved Yet </h2>} */}
          {load && list && list?.map((todo) => {
              let date = new Date(todo.Date);
              return (
                <tr key={todo.id} style={{ backgroundColor: "yellow" }}>
                  {/* <th className='col col-sm-2' scope="row">{`${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`}</th> */}
                  <th className='col col-sm-2' scope="row">{`${date.toDateString().substring(0,3)}, ${date.toDateString().substring(8,10)} ${date.toDateString().substring(3,7)}, ${date.toDateString().substring(10,15)}`}</th>
                  <td className='col col-sm-4'>{todo.Task}</td>
                  <td className='col col-sm-4'>{todo.Completed ? "Completed" : "Not Completed"}</td>
                  <td className='col col-sm-4'><i title='Edit' className="fa-solid fa-pen-to-square mx-4" style={{color:"green"}} type="button" onClick={()=>{
                    setETodo({id:`${todo.id}`, date:`${todo.Date}`, task:`${todo.Task}`, Completed:todo.Completed});
                    console.log(eTodo);
                    ref.current.click();
                  }}></i>
                    <i type="button" title={`Mark as ${todo.Completed?"Not Complete":"Complete"}`} className={todo.Completed?"fa-solid fa-xmark":"fa-solid fa-check"} style={{color: todo.Completed?"red":"blue"}}  onClick={async()=>{
                      if(todo.Completed===1){
                        const response = await fetch(`http://localhost:5000/api/todo/update/completed/${todo.id}/0`,{
                          method:"GET",
                          headers: {
                            "Content-Type": "application/json",
                            "authToken": localStorage.getItem('token')
                          },
                        })
                        if(response.ok){
                          getList();
                        }
                      }
                      else if (todo.Completed===0){
                        const response = await fetch(`http://localhost:5000/api/todo/update/completed/${todo.id}/1`,{
                          method:"GET",
                          headers: {
                            "Content-Type": "application/json",
                            "authToken": localStorage.getItem('token')
                          },
                        })
                        if(response.ok){
                          getList();
                        }
                      }
                    }}></i>
                    <i type="button" title='Delete' className="fa-solid fa-trash mx-4" style={{color:"red"}} onClick={async()=>{
                      const response = await fetch(`http://localhost:5000/api/todo/delete/todo/${todo.id}`,{
                        method:"GET",
                        headers: {
                            "Content-Type": "application/json",
                            "authToken": localStorage.getItem('token')
                          },
                      });
                      if(response.ok){
                        getList();
                      }

                    }}></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Todos