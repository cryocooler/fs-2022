import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [succesMessage, setSuccessMessage] = useState(null);

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(newBlog));
      setSuccessMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} was added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Failed to add blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const removeBlog = async (blogObject) => {
    console.log("logged in user", user);
    console.log("Blog user", blogObject.user.name);
    console.log(
      "is logged in user equivalent to blog user?",
      user.username === blogObject.user.username
    );
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      console.log(`removing blog with ID ${blogObject.id}`);
      try {
        const blogToDelete = await blogService.remove(blogObject);
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
      } catch (exception) {}
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setSuccessMessage("Logged in succesfully");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      console.log("exception triggered");
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const updateBlog = async (blogObject) => {
    console.log("trigger api call");
    console.log(`passed blog ${blogObject}`);
    try {
      const updatedBlog = await blogService.update(blogObject);
      setBlogs(blogs.map((b) => (b.id !== blogObject.id ? b : blogObject)));
      return updatedBlog;
      // update blogs with updatedBlog
    } catch (exception) {}
  };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={succesMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} is logged in
          <button
            onClick={() => {
              setUser(null);
              window.localStorage.removeItem("loggedBlogappUser");
            }}
          >
            logout
          </button>
          {blogForm()}
          {blogs
            .sort(function (a, b) {
              return b.likes - a.likes;
            })
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                currentUser={user}
              />
            ))}
        </div>
      )}
    </div>
  );
};

// {blogs.map((blog) => (
//   <Blog key={blog.id} blog={blog} />

export default App;
