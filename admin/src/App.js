import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Admin from './components/Admin/Admin';
import CreateEmployee from './components/CreateEmp/CreateEmployee';


function App() {
  return (
    <div>
      <ToastContainer closeButton={(<button className="toast-close-btn">X</button>)}/>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/create-employee' element={<CreateEmployee />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
