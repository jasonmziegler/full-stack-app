//import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';

import Header from './components/Header';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import Error from './components/Error';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import UpdateCourse from './components/UpdateCourse';

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    //Make API Request
    axios.get('http://localhost:5000/api/courses')
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
  }, []);

  return (
    <div>
      {console.log(UserContext)}
      <Header/>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Courses/>} />
        <Route path="/courses/:id" element={<CourseDetail/>} />
        <Route path='/error' element={<Error/>} />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='/signup' element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/courses/create" element={<CreateCourse/>} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
        </Route>
        {/* Anything Else*/}
        <Route path='*' element={<NotFound/>} />
      </Routes> 
    </div>
  );
}

export default App;
