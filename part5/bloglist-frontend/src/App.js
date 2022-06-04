import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      title:
      <input
        type="text"
        value={title}
        name="title"
        onChange={handleTitleChange}
      />
    </div>
    <div>
      author:
      <input
        type="text"
        value={author}
        name="author"
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      url:
      <input type="text" value={url} name="url" onChange={handleUrlChange} />
    </div>
    <button type="submit">create</button>
  </form>
);

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [succesMessage, setSuccessMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [blogAdditionVisible, setBlogAdditionVisible] = useState(false);
  const [detaislVisible, setDetailsVisible] = useState(false);

  const addBlog = async (event) => {
    console.log("TRYING TO ADD BLOG");
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url,
      });
      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogAdditionVisible(false);
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

  const blogForm = () => {
    const hideWhenVisible = { display: blogAdditionVisible ? "none" : "" };
    const showWhenVisible = { display: blogAdditionVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogAdditionVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => setBlogAdditionVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

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
          <h2>create new</h2>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

// {blogs.map((blog) => (
//   <Blog key={blog.id} blog={blog} />

export default App;
