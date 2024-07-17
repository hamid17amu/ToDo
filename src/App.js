import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import TodoState from './context/todos/TodoState';
import Signup from './components/Signup';
import Changepass from './components/ChangePass';
import Alert from './components/Alert';

function App() {
  
  
  return (
    <div className='mx-2'>
      <TodoState>
      <Router>
        <Navbar/>
        <Alert/>
        {/* <Home/> */}
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          {/* <Route exact path="/about" element={<About/>}/> */}
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/changepass" element={<Changepass/>}/>
          {/* <Route exact path="/profile" element={<Profile/>}/> */}
        </Routes>
      </Router>
      </TodoState>
    </div>
  );
}

export default App;
