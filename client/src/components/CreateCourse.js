import React, {useState, useContext} from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const CreateCourse = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [course, setCourse] = useState({
        userId: user.id,
        title: '',
        description: "",
        estimatedTime: "", 
        materialsNeeded: "",
    }
    );

    const [ errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setCourse({...course, 
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/courses", course, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${user.authToken}`,
        },
      });
      if (response.status === 201) {
        const {courseId} = response.data;
        navigate(`/courses/${courseId}`); // Redirect to the course list after create course is successful
      }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors(error.response.data.errors);
        } else {
          navigate("/error");
        }
      }
    };
    const handleCancel = () => {
      navigate("/");
    }
    return (
        <main>
            <div class="wrap">
                <h2>Create Course</h2>
                {errors.length > 0 && (
                  <div class="validation--errors">
                  <h3>Validation Errors</h3>
                  <ul>
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                  </ul>
                </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div class="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input 
                              id="courseTitle" 
                              name="title" 
                              type="text" 
                              value={course.title}
                              onChange={handleChange}></input>

                            <p>By {user.firstName}, UserId {user.id} </p>

                            <label for="courseDescription">Course Description</label>
                            <textarea 
                              id="courseDescription" 
                              name="description"
                              value={course.description}
                              onChange={handleChange}
                              ></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input 
                              id="estimatedTime" 
                              name="estimatedTime" 
                              type="text" 
                              value={course.estimatedTime}
                              onChange={handleChange}></input>

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea 
                              id="materialsNeeded" 
                              name="materialsNeeded"
                              value={course.materialsNeeded}
                              onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default CreateCourse;
/*
<!DOCTYPE html>
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