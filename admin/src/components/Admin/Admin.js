import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';
import downloadImage from '../../assets/download.jpg';
import CreateEmployee from '../CreateEmp/CreateEmployee';
import { toast } from 'react-toastify';

function Admin() {
  const url = "http://localhost:5000";
  const [employees, setEmployees] = useState([]);
  const [view, setView] = useState('home'); 
  const [username, setUsername] = useState('Admin'); 
  const [inp,setInp] = useState('');
  const [filteredArray,setFilteredArray] = useState([])

  const navigate = useNavigate();
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(url + '/api/user/empdetails');
      console.log(response.data)
      setEmployees(response.data.data);
      setFilteredArray(response.data.data)
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };
  const removeItem = async (empId)=>{
    try{
      const resp = await axios.delete(`${url}/api/user/remove/${empId}`);
      await fetchEmployees();
      if(resp.data.success){
        toast.success('successfully removed')
      }
    } catch(e){
      toast.error(e)
    }
  }

  useEffect(() => {
    if (view === 'employeeList') {
      fetchEmployees();
    }
  }, [view]);

  useEffect(()=>{
    const filt = employees.filter((emp)=>{
      return(
        emp.name.toLowerCase().includes(inp.toLowerCase()) || 
        emp.designation.toLowerCase().includes(inp.toLowerCase()) || 
        emp.courses.toLowerCase().includes(inp.toLowerCase())
      )
    })
    setFilteredArray(inp?filt:employees)
  },[inp,employees])

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem("username")
  };

  useEffect(()=>{
    const name = localStorage.getItem("username");
    setUsername(name)
  },[])

  return (
    <div>
      <img src={downloadImage} alt='admin'/>
      <div className="containerr">
        <h2>Admin Dashboard</h2>
        <div className='nav'>
          <div className="nav-buttons">
            <button onClick={() => setView('home')}>Home</button>
            <button onClick={() => setView('employeeList')}>Employee List</button>
            <button onClick={() => setView('lol')}>Create Employee</button>
          </div>
          <div className='butt'>
              <span>{username}</span>
              <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        
        <div className="content">
          {
          view === 'home'? <h3>Welcome to the Admin Dashboard</h3>:
          view === 'employeeList'?
          <div>
            <h3>Employee List</h3>
            <div className='extra'>
              <div>
                <label htmlFor='key'>Search</label>
                <input type='text' name='key' placeholder='enter search key' value={inp} onChange={(e)=>setInp(e.target.value)} />
              </div>
              <div>
                <p className='count'>Total Count: {filteredArray.length}</p>
              </div>
            </div>
            <div className='ul'>
                <li>Id</li>
                <li>Image</li>
                <li>Name</li>
                <li>Email</li>
                <li>mobile</li>
                <li>Designation</li>
                <li>gender</li>
                <li>course </li>
                <li>created date</li>
                <li>action</li>
            </div>
            {filteredArray.map((item,index)=>{
              return(
                <div className='ul' key={index}>
                  <p>{item._id}</p>
                  <img className='gmi' src={`${url}/images/`+item.image}/>
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>{item.mobile}</p>
                  <p>{item.designation}</p>
                  <p>{item.gender}</p>
                  <p>{item.courses}</p>
                  <p>{item.createdAt}</p>
                  <p className='cursor' onClick={()=>removeItem(item._id)}>X</p>
                </div>
              )
            })}
          </div>
          :<CreateEmployee />
          }
        </div>
        </div>
      </div>
  );
}

export default Admin;
