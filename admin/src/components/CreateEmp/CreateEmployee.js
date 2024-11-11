import React, { useState } from 'react';
import axios from 'axios';
import './CreateEmployee.css';
import {toast} from 'react-toastify'


function CreateEmployee() {
  const url = "http://localhost:5000"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        courses: checked
          ? [...prevState.courses, value]
          : prevState.courses.filter((course) => course !== value),
      }));
    } else if (type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('mobile', formData.mobile);
    data.append('designation', formData.designation);
    data.append('gender', formData.gender);
    data.append('courses', formData.courses);
    data.append('image', formData.image);

    try {
      await axios.post(url + '/api/user/addEmployee', data)
      .then((result) => {
        console.log(result);
        if(result.data.success){
          setFormData({
            name: '',
            email: '',
            mobile: '',
            designation: '',
            gender: '',
            courses: [],
            image: null,
          })
        }
      }).catch((err) => {
        console.log(err)
      });
      toast.success('Employee created successfully');
    } catch (error) {
      console.error('Failed to create employee', error);
      toast.error('Failed to create employee');
    }
  };

  return (
    <div className="container">
      <h4>Create Employee</h4>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='formdata'>        
          <div className='namefield'>
            <label className='name'>Name:</label>
            <input className='inputname' type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className='emailfeild'>
            <label className='email'>Email:</label>
            <input className='inputemail' type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className='mobfield'>
            <label className='mobile'>Mobile:</label>
            <input className='tel' type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </div>
          <div className='desig'>
            <label className='designation'>Designation:</label>
            <select name="designation" value={formData.designation} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
          </div>
          <div className='gender'>
            <label className='gen'>Gender:</label>
            <div className='first'>
              <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
              <label className='male'> Male</label>
            </div>
            <div className='second'>
            <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
            <label className='female'>Female</label>
            </div>
          </div>
          <div className='courses'>
            <label className='coursefont'>Courses:</label>
            <div className='mca'>
              <label>MCA</label>
              <input type="checkbox" name="courses" value="MCA" checked={formData.courses.includes('MCA')} onChange={handleChange} />
            </div>
            <div className='mba'>
              <label>MBA</label>
              <input type="checkbox" name="courses" value="MBA" checked={formData.courses.includes('MBA')} onChange={handleChange} />
            </div>
            <div className='bsc'> 
              <label>BSc</label>
              <input type="checkbox" name="courses" value="BSc" checked={formData.courses.includes('BSc')} onChange={handleChange} />
            </div>
          </div>
          <div className='imagee'>
            <label className='upload'>Upload Image:</label>
            <input className="imu" type="file" name="image" accept=".jpg, .jpeg, .png" onChange={handleChange} required />
          </div>
          <button className='empbutton' type="submit">Submit</button></div>
      </form>
    </div>
  );
}

export default CreateEmployee;
