//import Blog from "./components/Blog";
//import blogService from "./services/blogs";
//import loginService from "./services/login";
import userService from "./services/users";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import BlogList from "./components/BlogList";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { createNotification } from "./reducers/notificationReducer";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";

//import { logOutUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const [blogUsers, setBlogUsers] = useState([]);

  useEffect(() => {
    //console.log("hook fired setting blogs");
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    userService.getAll().then((blogUsers) => setBlogUsers(blogUsers));
  }, []);

  // useEffect(() => {
  //   dispatch(initializeUser());
  // }, [dispatch]);

  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     dispatch(setUser(user));
  //     blogService.setToken(user.token);
  //   }
  // }, [dispatch]);

  //console.log("current user initialized", user);

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject));
    ///const newBlog = await blogService.create(blogObject);
    blogFormRef.current.toggleVisibility();
    //blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  // const removeBlog = (blogObject) => {
  //   dispatch(destroyBlog(blogObject));
  //   //
  //   console.log("logged in user", users);
  //   console.log("Blog user", blogObject.user.name);
  //   console.log(
  //     "is logged in user equivalent to blog user?",
  //     users.username === blogObject.user.username
  //   );
  // };

  // try {
  //   const user = await loginService.login({
  //     username,
  //     password,
  //   });
  //   window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  //   blogService.setToken(user.token);
  //   dispatch(setUser(user));
  //   setUsername("");
  //   setPassword("");
  //   dispatch(createNotification("Logged in succesfully", 5, "success"));
  // } catch (exception) {
  //   console.log("exception triggered");
  //   dispatch(createNotification("Wrong username or password", 5, "error"));
  // }

  // const updateBlog = async (blogObject) => {
  //   dispatch(addLike(blogObject));
  //   console.log("trigger api call");
  //   console.log(`passed blog ${blogObject}`);
  //   try {
  //     const updatedBlog = await blogService.update(blogObject);
  //     blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  //     return updatedBlog;
  //     // update blogs with updatedBlog
  //   } catch (exception) {
  //     console.log("error");
  //   }
  // };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoginForm />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              users === null ? null : (
                <div>
                  {blogForm()}
                  <BlogList user={users} blogs={blogs} />
                </div>
              )
            }
          />
          <Route path="/users" element={<Users users={blogUsers} />} />
        </Routes>
      </Router>
    </div>
  );
};
// {blogs.map((blog) => (
//   <Blog key={blog.id} blog={blog} />

export default App;
