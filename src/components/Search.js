import React, {useState, useContext} from 'react'
import TodoContext from '../context/todos/TodoContext';

const Search = () => {
    const context = useContext(TodoContext);
    const {list, getbydate, setOpt} = context;

    const [date, setDate] = useState(null);

    const onChange=({target})=>{
        console.log(target.value);
        setDate(target.value);
    }

  return (

    <div>
        <div className="col col-sm-2">
            <form onSubmit={(e)=>{
                getbydate(date);
                setOpt(0);
                console.log(list);
                e.preventDefault();
            }}>
            <th scope="col">
            <input type="date" onChange={onChange} className="form-control mx-2" id="date" name="date"></input>
            </th>
            <th scope="col">
                <button type="submit" className="btn btn-primary mx-2">Search</button>
            </th>
            
            </form>
        </div>
    </div>
  )
}

export default Search