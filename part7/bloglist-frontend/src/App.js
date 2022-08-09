import Blog from "./components/Blog";
import { Container, Typography } from "@mui/material";

//import blogService from "./services/blogs";
//import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";
import BlogList from "./components/BlogList";
import Menu from "./components/Menu";
import blogService from "./services/blogs";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { createNotification } from "./reducers/notificationReducer";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";

//import { logOutUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const loggedUser = useSelector((state) => state.login);

  console.log("current user state", loggedUser);

  useEffect(() => {
    //console.log("hook fired setting blogs");
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const token = loggedUser ? loggedUser.token : null;

    blogService.setToken(token);
  }, [loggedUser]);

  //console.log("current user", users);

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
    <Togglable
      buttonLabel="create new blog"
      Label="Create new"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} user={loggedUser} />
    </Togglable>
  );

  return (
    <Container>
      <div>
        <Router>
          <Menu />
          <br></br>
          <Typography variant="h4" margin="normal">
            Blog app
          </Typography>
          <br></br>
          <Notification />
          <LoginForm />
          <br></br>
          <Routes>
            <Route
              path="/"
              element={
                loggedUser === null ? null : (
                  <div>
                    {blogForm()}
                    <BlogList user={loggedUser} blogs={blogs} />
                  </div>
                )
              }
            />
            <Route path="/users" element={<Users />} />
            <Route
              path="/users/:id"
              element={<User users={users} blogs={blogs} />}
            />
            <Route path="/blogs/:id" element={<Blog blogs={blogs}></Blog>} />
          </Routes>
        </Router>
      </div>
    </Container>
  );
};
// {blogs.map((blog) => (
//   <Blog key={blog.id} blog={blog} />

export default App;
