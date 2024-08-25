// src/components/Header.js
import '../styles/global.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return(
<header>
            <div class="wrap header--flex">
                <h1 class="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    <ul class="header--signedout">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
  )
}

export default Header;