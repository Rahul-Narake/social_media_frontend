import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../components/index';
import {
  Bell,
  BookCopy,
  Bookmark,
  Home,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  UserCircle,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/slices/user.slice';

function Sidebar() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const items = [
    {
      name: 'Home',
      slug: '/',
      active: true,
      icon: <Home size={32} />,
    },
    {
      name: 'Explore',
      slug: '/in-progress',
      active: !isLoggedIn,
      icon: <Search size={32} />,
    },
    {
      name: 'Notifications',
      slug: '/in-progress',
      active: !isLoggedIn,
      icon: <Bell size={32} />,
    },
    {
      name: 'Messages',
      slug: '/in-progress',
      active: isLoggedIn,
      icon: <MessageSquare size={32} />,
    },
    {
      name: 'Bookmarks',
      slug: '/bookmarks',
      active: isLoggedIn,
      icon: <Bookmark size={32} />,
    },
    {
      name: 'Profile',
      slug: '/profile',
      active: isLoggedIn,
      icon: <UserCircle size={32} />,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: isLoggedIn,
      icon: <Plus size={32} />,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: isLoggedIn,
      icon: <BookCopy size={32} />,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="flex content-between px-auto py-8 ">
      <Container>
        <nav className="flex">
          <div className="flex flex-col mx-auto justify-between items-center space-y-4">
            {items.map((item) => {
              return (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'flex flex-wrap justify-start space-x-4 items-center w-full text-gray-700 hover:bg-gray-600 hover:rounded-3xl px-2 py-1'
                      : 'flex flex-wrap justify-start space-x-4 items-center w-full text-gray-400 hover:bg-gray-600 hover:rounded-3xl px-2 py-1'
                  }
                  key={item?.name}
                  to={item?.slug}
                >
                  <div>{item.icon}</div>
                  <div className="text-xl">{item.name}</div>
                </NavLink>
              );
            })}
            <div
              className="flex flex-wrap justify-start space-x-4 items-center w-full cursor-pointer pl-2 py-1 text-gray-400"
              onClick={handleLogout}
            >
              <LogOut size={32} />
              <p className="text-xl">Logout</p>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
}

export default Sidebar;
