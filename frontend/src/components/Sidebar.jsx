/*
    An <Outlet> should be used in parent route elements to render their child route elements. 
    This allows nested UI to show up when child routes are rendered. 
    If the parent route matched exactly, it will render a child index route or nothing if there is no index route.
*/

import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import '../styles/Sidebar.css';

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const navigate = useNavigate();
    const logout = async (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        console.log(localStorage)
        navigate('/login');
    }

    const sidebarData = [
        {
          title: 'About Us',
          path: '/about',
          icon: <AiIcons.AiOutlineInfo />,
          cName: 'nav-text'
        },
        {
          title: 'Home',
          path: '/',
          icon: <AiIcons.AiFillHome />,
          cName: 'nav-text'
        },
        {
          title: 'Profile',
          path: '/profile',
          icon: <FaIcons.FaUser />,
          cName: 'nav-text'
        },
        {
          title: 'Logout',
          path: '/login',
          icon: <FaIcons.FaSignOutAlt />,
          cName: 'nav-text'
        },
    ];

    return (
        <>
            <IconContext.Provider value={{ color: 'white' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <div className='appName'>clndr.</div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {sidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    {item.title === 'Logout' ? (
                                        <Link to={item.path} onClick={logout}>
                                            {item.icon}
                                            <span className="span">{item.title}</span>
                                        </Link>
                                    ) : (
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span className="span">{item.title}</span>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        <Outlet />
        </>
    );
}

export default Sidebar;