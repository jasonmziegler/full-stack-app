import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// moved axios import to UserContext
import { UserContext } from "../context/UserContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  // Event Handlers
  const handleSignIn = async (e) => {
    e.preventDefault();

    const credentials = {
      username: email,
      password: password,
    };
    // Moved encoded credentials  and axios options to UserContext
    

    try {
      const user = await actions.signInUser(credentials);

      if (user) {
        navigate("/");
      } else {
        setError('Sign in was unsuccessful');
      }
      // We need to Move the API call to the UserContext
      // TODO: Get user from UserContext (we need still need to handle errors)
        // Success ( user !== null) -> navigate to authenticated route
        // Failure (use === nul) -> Update error state
    } catch (error) {
      console.log(error.response.status);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: Incorrect email or password');
        console.log(error);
      } else {
      console.log("Error: ", error);
      navigate("/error");
    }
    }

    // try {
    //   const response = await axios.get("http://localhost:5000/api/users", {
    //     email,
    //     password,
    //   });

    //   if (response.status === 200) {
    //     navigate("/courses");
    //   }
    // } catch (err) {
    //   setError("Invalid email or password");
    // }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
        <form onSubmit={handleSignIn}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></input>
          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <a href="sign-up.html">sign up</a>!
        </p>
      </div>
    </main>
  );
};

export default SignIn;
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
