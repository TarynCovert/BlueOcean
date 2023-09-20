import React, { useState } from 'react';
import {
  Navbar,
  Typography,
} from '@material-tailwind/react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function StickyNavbar() {
  const navigate = useNavigate();
  const [loggedIn, setIsLoggedIn] = useState(Cookies.get('userId'));

  const handleLogout = () => {
    Cookies.remove('userId');
    setIsLoggedIn(Cookies.get('userId'));
  };

  return (
    <Navbar className="sticky top-0 h-max z-10 max-w-full">
      <div className="flex items-center justify-center text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Home
        </Typography>
        {loggedIn ? (
          <Typography
            as="a"
            onClick={handleLogout}
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Logout
          </Typography>
        ) : (
          <Typography
            as="a"
            onClick={() => navigate('/login')}
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Login
          </Typography>
        )}
        <Typography
          as="a"
          href="/createStory"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Create Story
        </Typography>
        <Typography
          as="a"
          href="/Signup"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Sign Up
        </Typography>
      </div>
    </Navbar>
  );
}

export default StickyNavbar;
