// src/components/Header.js
//https://teamtreehouse.com/library/react-authentication-2/display-authenticated-user-in-multiple-components

import "../styles/global.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            {/* {console.log("Auth User: ", user)} */}
            {user ? (
              <>
                <li>Welcome, {user.firstName}</li>
                <li>
                  <Link to="/signout">Sign Out</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
