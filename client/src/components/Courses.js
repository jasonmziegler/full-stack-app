// src/components/index.js

import React from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
        <main>
          <div class="wrap main--grid">
            <Link class="course--module course--link" to="courses/1">
              <h2 class="course--label">Course</h2>
              <h3 class="course--title">Build a Basic Bookcase</h3>
            </Link>
            <Link
              class="course--module course--add--module"
              to="/courses/create"
            >
              <span class="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  class="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </span>
            </Link>
          </div>
        </main>
  );
};

export default Courses;
/*
<!DOCTYPE html>
<html lang="en">

</html><head>
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



</html>
 */
