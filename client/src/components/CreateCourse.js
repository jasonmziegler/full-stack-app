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
        console.log(error);
        if (error.response && error.response.status === 400) {
          console.log("400 error detected", error.response.data.message.errors);
          setErrors(error.response.data.message.errors);
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
            <div className="wrap">
                <h2>Create Course</h2>
                {errors.length > 0 
                ? (
                  <div className="validation--errors">
                  <h3>Validation Errors</h3>
                  <ul>
                      {errors.map((error, index) => (
                        <li key={index}>{error.message}</li>
                      ))}
                  </ul>
                </div>
                ) : null}
                
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                              id="courseTitle" 
                              name="title" 
                              type="text" 
                              value={course.title}
                              onChange={handleChange}></input>

                            <p>By {user.firstName}, UserId {user.id} </p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                              id="courseDescription" 
                              name="description"
                              value={course.description}
                              onChange={handleChange}
                              ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                              id="estimatedTime" 
                              name="estimatedTime" 
                              type="text" 
                              value={course.estimatedTime}
                              onChange={handleChange}></input>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
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
