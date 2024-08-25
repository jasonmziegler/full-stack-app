//import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Courses from './components/Courses';
//import CourseDetail from './components/CourseDetail';
//import CreateCourse from './components/CreateCourse';
//import Error from './components/Error';
// import Forbidden from './components/Forbidden';
// import NotFound from './components/NotFound';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import UpdateCourse from './components/UpdateCourse';

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
  })
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Courses/>} />
      </Routes>
      <div>
      
      
      <h1>API Data</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </Router>
  );
}

export default App;
