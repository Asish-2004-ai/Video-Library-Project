import logo from './logo.svg';
// import '../src/css/header.css'
import './App.css';
import { Route, Routes, BrowserRouter, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home } from './Component/home';
import { Admin } from './Component/admin-login';
import { Dashbord } from './Component/admin-dashbord';
import { Addvideo } from './Component/addvideo';
import { Editvideo } from './Component/edit-video';
import { Deletevideo } from './Component/delete-video';
import { useCookies } from 'react-cookie';
import { Signout } from './Component/signout';
import { Register } from './Component/resister';
import { Userlogin } from './Component/user-login';
import { Userdashbord } from './Component/user-dashbord';
import { useState } from 'react';
import { Signoutuser } from './Component/signout-user';
import '../src/css/header.css';
import { Forgot } from './Component/forgot';
import { VideoPage } from './Component/video';

export function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(['admin-id']);
  const location = useLocation();
  const [vissible, setvissible] = useState(true);

  const hideUserLoginPaths = [
    '/user-dashbord',
    '/admin-dashbord',
    '/edit-video',
    '/user-login',
    '/addvideo',
    '/delete-video',
    '/forgot',
    '/register',
    '/video' // Add '/video' to this array
  ];

  return (
    <header className='p-3 d-flex justify-content-between bg-dark'>
    <span className='h2'>
      <Link to='/' className='text-danger text-decoration-none'>
        Video Library
      </Link>
    </span>
    <div className='d-flex justify-content-around ms-2'>
      {!hideUserLoginPaths.some(path => location.pathname.startsWith(path)) ? (
        <Link to='/user-login' className='btn btn-secondary text-decoration-none me-2'>
          User Login
        </Link>
      ) : location.pathname === '/user-dashbord' || location.pathname==='/video' ? ( 
        <Signoutuser />
      ) : null}
      {location.pathname !== '/user-dashbord' &&
        location.pathname !== '/admin-login' &&
        (cookies['admin-id'] === undefined ? (
          vissible && (
            <Link to='/admin-login' className='btn btn-primary text-decoration-none'>
              Admin Login
            </Link>
          )
        ) : (
          <Signout />
        ))}
    </div>
  </header>
  );
}

function App() {
  return (
    <div className={`container-fluid text-white`} style={{ height: '100vh' }}>
      <BrowserRouter>
        <Header />
        <section>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='admin-login' element={<Admin />}></Route>
            <Route path='admin-dashbord' element={<Dashbord />}></Route>
            <Route path='addvideo' element={<Addvideo />}></Route>
            <Route path='edit-video/:id' element={<Editvideo />}></Route>
            <Route path='delete-video/:id' element={<Deletevideo />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='user-login' element={<Userlogin />}></Route>
            <Route path='user-dashbord' element={<Userdashbord />}></Route>
            <Route path='forgot/:id' element={<Forgot />}></Route>
            <Route path='video/:id' element={<VideoPage />}></Route>
          </Routes>
         
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
