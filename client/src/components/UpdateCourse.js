import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
        if (error.response && error.response.status === 404) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        url: `http://localhost:5000/api/courses/${id}`,
        method: "PUT",
        headers: {
          'Authorization': `Basic ${user.authToken}`,
        },
        data: {
          title: course.title,
          description: course.description,
          estimatedTime: course.estimatedTime,
          materialsNeeded: course.materialsNeeded,
          userId: user.id, 
        }
      };
      const response = await axios(options);
      if (response.status === 204) {
        navigate(`/courses/${id}`)
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.message.errors);
      } else {
        navigate('/error');
      }
    }
  };

  const handleCancel = () => {
    navigate(`/courses/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        { errors.length > 0 && (
          <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="title"
                type="text"
                value={course.title}
                onChange={handleChange}
              ></input>

              <p>By {user.firstName} {user.lastName}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea 
                id="courseDescription" 
                name="description"
                value={course.description}
                onChange={handleChange}
                >
              </textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={course.estimatedTime}
                onChange={handleChange}
              ></input>

              <label htmlFor="materialsNeeded">Materials Needed</label>
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
