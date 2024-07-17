import React from 'react'
import AddTodo from './AddTodo'
import Todos from './Todos'

const Home = () => {
  return (
    <div className='my-3'>
        <AddTodo/>
        <Todos/>
    </div>
  )
}

export default Home