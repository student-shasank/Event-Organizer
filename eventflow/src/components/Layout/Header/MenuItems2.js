import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuItems2 = ({ parentMenu, secondParentMenu, activeMenu }) => {
  const location = useLocation(); // Current page/route detect karne ke liye
  
  // Check if user is on contact page
  const isContactPage = location.pathname === '/contact';
  
  // Menu text color decide karo
  const menuTextColor = isContactPage ? 'white' : 'black';
  const menuListColor = isContactPage ? 'white' : 'blue';

  return (
    <ul className="main-menu__list" style={{color: menuListColor}}>
      <li className={parentMenu === 'Home' ? 'dropdown current-menu-item' : 'dropdown'} >
        <Link to="/home" style={{color: menuTextColor}}>Home</Link>
      </li>

      {/* <li className={parentMenu === 'Event' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#" style={{color: menuTextColor}}>Event</Link>
      </li> */}

      <li className={parentMenu === 'Contact' ? 'current-menu-item' : ''}>
        <Link 
          to="/contact" 
          className={activeMenu === '/contact' ? 'active-menu' : ''} 
          style={{color: menuTextColor}}
        >
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default MenuItems2;