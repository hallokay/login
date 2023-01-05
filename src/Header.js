import React from 'react'
import { Link } from 'react-router-dom'


const Header = ({logo}) => {
  return (
    <header>
        <nav>
            <h1>{logo}</h1>
            <ul className='nav-menu'>
                <li><Link to="/list">List(checkbox)</Link></li>
                {/* <li><Link to="/color_change">Color</Link></li> */}
                <li><Link to="/form">Form</Link></li>
                <li><Link to="/multiform">multiform</Link></li>
                <li><Link to="/bigCalendar">bigCalendar</Link></li>
                <li><Link to="/apiChallenge">apiChallenge</Link></li>
                <li><Link to="/register">register</Link></li>
            </ul>
        </nav>
    </header>
  )
}

// props가 없을때 default값
Header.defaultProps = {
  logo: 'default logo'
};

export default Header