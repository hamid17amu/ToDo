import TodoContext from "./TodoContext";
import { useState } from "react";


const TodoState = (props) => {
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [opt, setOpt] = useState(1)

    const getList = async()=>{
        setLoad(false);
        const response = await fetch("http://localhost:5000/api/todo/show/todo",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authToken": localStorage.getItem('token')
          },
        })
    
        const json = await response.json();
        setList(json);
        setLoad(true);
        console.log(json);
      }

      const addTodo = async(todo)=>{
        let date = todo.date; let task = todo.task
        console.log(JSON.stringify({date,task}));
          const response = await fetch("http://localhost:5000/api/todo/add/todo",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authToken": localStorage.getItem('token')
          },
          body:JSON.stringify({date, task})
          })
    
          if(response.ok){
            getList();
          }
    
          const json = await response.json();
    
          console.log(json);
      }

      const editTodo = async(eTodo)=>{
        // e.preventDefault();
        let Date = eTodo.date, Task = eTodo.task,Completed=eTodo.Completed, id = eTodo.id;
        console.log(JSON.stringify({id, Date,Task,Completed}));
        const response = await fetch(`http://localhost:5000/api/todo/update/todo/${id}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authToken": localStorage.getItem('token')
          },
          body:JSON.stringify({Date, Task, Completed})
          })
    
          if(response.ok){
            getList();
          }
      }
      
      
    const [alert, setAlert] = useState(null)

      const showAlert = (message,type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(()=>{
          setAlert(null);
        },3000)
      }

      const getCompleted = async()=>{
        setLoad(false);
        const response = await fetch("http://localhost:5000/api/todo/show/completed",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authToken": localStorage.getItem('token')
          },
        })
    
        const json = await response.json();
    
        setList(json);
        setLoad(true);
        console.log(json);
      }

      const getNotCompleted= async()=>{
        setLoad(false);
        const response = await fetch("http://localhost:5000/api/todo/show/notcompleted",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authToken": localStorage.getItem('token')
          },
        })
    
        const json = await response.json();
    
        setList(json);
        setLoad(true);
        console.log(json);
      }

      const getbydate= async(date)=>{
        setLoad(false);
        const response = await fetch(`http://localhost:5000/api/todo/show/bydate/${date}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authToken": localStorage.getItem('token')
          },
        })
    
        const json = await response.json();
    
        setList(json);
        setLoad(true);
        console.log(json);
      }
    

  return (
    <TodoContext.Provider value={{list, getList, addTodo,editTodo, alert, showAlert, getCompleted, getNotCompleted, getbydate, load,
    opt, setOpt}}>
        {props.children}
    </TodoContext.Provider>
  )
}

export default TodoState