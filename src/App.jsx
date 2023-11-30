import { Toaster } from 'react-hot-toast';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './store/slices/user.slice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (localStorage.getItem('accessToken')) dispatch(getCurrentUser());
    else {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem('accessToken')) dispatch(getCurrentUser());
    else {
      navigate('/login');
    }
  }, [isLoggedIn]);
  return (
    <div className="min-h-screen flex flex-wrap content-between ">
      <div className="w-full block">
        <Toaster />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
