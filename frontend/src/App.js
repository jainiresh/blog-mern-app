import './App.css';
import Header from './components/Header';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';
import UserBlogs from './components/UserBlogs';
import { useEffect } from 'react';
import { authActions } from './store';
function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  // useEffect(() => {

  //   if (localStorage.getItem('userId') != undefined) {
  //     dispatch(authActions.login());
  //   }
  // }, [dispatch]);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path='/auth' element={<Auth />} />
          ) : (
            <>
              <Route path='/blogs' element={<Blogs />} />
              <Route exact path='/myBlogs' element={<UserBlogs />} />
              <Route path='/myBlogs/:id' element={<BlogDetails />} />
              <Route path='/blogs/add' element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
