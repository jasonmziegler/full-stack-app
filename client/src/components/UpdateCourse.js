import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UpdateCourse = () => {
  const {id} = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  // Get course details from API when component MOunts
  useEffect(()=> {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        const fetchedCourse = response.data;
        if (fetchedCourse.userId !== user.id) {
          navigate("/forbidden");
        } else {
          setCourse(fetchedCourse);
        }
        setLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status == 404) {
          navigate('/not-found');
        } else {
          navigate('/error');
        }
      });
  }, [id, navigate, user.id]);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  const handleCancel = () => {
    navigate(`/courses/${id}`);
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label for="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="title"
                type="text"
                value={course.title}
                onChange={handleChange}
              ></input>

              <p>By User {user.firstName} Id {course.userId}</p>

              <label for="courseDescription">Course Description</label>
              <textarea 
                id="courseDescription" 
                name="description"
                value={course.description}
                onChange={handleChange}
                >
              </textarea>
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={course.estimatedTime}
                onChange={handleChange}
              ></input>

              <label for="materialsNeeded">Materials Needed</label>
              <textarea 
                id="materialsNeeded" 
                name="materialsNeeded"
                value={course.materialsNeeded}
                onChange={handleChange}
              >
              </textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button
            className="button button-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;

/* <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Treehouse Full Stack JavaScript Project 10 | Full Stack App with React and a REST API">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
    <title>Courses</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap"
        rel="stylesheet">
    <link href="../styles/reset.css" rel="stylesheet">
    <link href="../styles/global.css" rel="stylesheet">
</head>

<body>
    <div id="root">
        <header>
            <div class="wrap header--flex">
                <h1 class="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul class="header--signedin">
                        <li>Welcome, Joe Smith!</li>
                        <li><a href="sign-out.html">Sign Out</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        
    </div>
</body>

</html>

*/
