import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams(); // Retrieve the course ID from the URL

  // console.log("Course ID from URL: ", id);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch course details only if the ID is valid
    if (id) {
      console.log('Id Param from URL: ', id);
      axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(response => {
          setCourse(response.data);
          console.log(response.data);
          setLoading(false); // Stop loading once data is fetched
        })
        .catch(error => {
          setError('Course not found');
          setLoading(false); // Stop loading if there's an error
        });
    } else {
      setLoading(false); // Stop loading if ID is invalid
      setError('Invalid course ID');
    }
  }, [id]); // The dependency array should only include `id`

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div class="actions--bar">
        <div class="wrap">
          <Link class="button" to={`/courses/${id}/update`}>
            Update Course
          </Link>
          <a class="button" href="#">
            Delete Course
          </a>
          <Link class="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      <div class="wrap">
        <h2>Course Detail</h2>
        <form>
          <div class="main--flex">
            <div>
              <h3 class="course--detail--title">Course</h3>
              <h4 class="course--name">{course.title}</h4>
              <p>By {course.userId}</p>

              <p>{course.description}</p>
            </div>
            <div>
              <h3 class="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 class="course--detail--title">Materials Needed</h3>
              <ul class="course--detail--list">
                {course.materialsNeeded}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;

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
