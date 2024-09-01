import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  // State
  const firstname = useRef(null);
  const lastname = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      firstName: firstname.current.value,
      lastName: lastname.current.value,
      emailAddress: username.current.value,
      password: password.current.value,
    }

    // axios

  const options = {
    url: 'http://localhost:5000/api/users',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(user)
  };
try {

  const response = await axios(options);

  if(response.status === 201) {
    console.log(`${user.username} is successfully signed up.`);
  } 
  // else if (response.status === 400) {
  //   const data = response.json();
  //   console.log(data);
  //   setErrors(data.errors);
  // }

//  axios(options)
//     .then(response => {
//       if(response.status === 201) {
//         console.log(`${user.username} is successfully signed up.`);
//       } else if (response.status === 400) {
//         const data = response.json();
//         console.log(data);
//         setErrors(data.errors);
//       }
//     }
  
//   )
} catch(error) {
  console.log("Caught Errors: ", error)
  if (error.response) {
    console.log("Server Error: ", error.response.data);
    setErrors(error.response.data.errors || ["An unexpected error occured"]);
  } else if (error.request) {
    console.log("No response received: ", error.request);
    setErrors(["No response from the server. Please try again later."]);
    navigate("/error");
  } else {
    console.log("Error setting up request: ", error.message);
    setErrors([error.message]);
    navigate("/error");
  }
};
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <main>
      <div class="form--centered">
        <h2>Sign Up</h2>

        {/*Error Code from react-authentication course */}
        {errors.length ? (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
              </div>
            </div>
          ) : null }
        <form onSubmit={handleSubmit}>
          <label for="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" ref={firstname}></input>
          <label for="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" ref={lastname}></input>
          <label for="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={username}
          ></input>
          <label for="password">Password</label>
          <input id="password" name="password" type="password" ref={password}></input>
          <button class="button" type="submit">
            Sign Up
          </button>
          <button
            class="button button-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default SignUp;
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
                    <ul class="header--signedout">
                        <li><a href="sign-up.html">Sign Up</a></li>
                        <li><a href="sign-in.html">Sign In</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        
    </div>
</body>

</html>

*/
