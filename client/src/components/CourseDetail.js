import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
  const { id } = useParams(); // Retrieve the course ID from the URL
  const { user } = useContext(UserContext); // Access the Authenticated User
  const navigate = useNavigate();

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

  // TODO: add a handleDeleteCourse function or add action to CourseContext
  // TODO: create CourseContext?
  const handleDeleteCourse = async () => {
    if (window.confirm("Delete this course? (Action cannot be undone)")) {
      try {
        // console.log("Course Deleted");
        const options = {
          method: "DELETE",
          url: `http://localhost:5000/api/courses/${id}`,
          headers: {
            'Authorization' : `Basic ${user.authToken}`
          }
        };
        await axios(options);
        navigate("/");
      } catch (error) {
        console.error("Error deleting course:", error);
        setError("Failed to delete course");
      }
    }
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div class="actions--bar">
        <div class="wrap">
          {/* Conditionally render Update and Delete buttons */}
          {user && user.id === course.userId && (
            <>
              <Link class="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <button onClick={handleDeleteCourse}>
                Delete Course
              </button>
            </>
          )}
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

              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 class="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 class="course--detail--title">Materials Needed</h3>
              <ul class="course--detail--list">
              <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
