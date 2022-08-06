import { useDispatch } from "react-redux";
import { useState } from "react";
import { destroyBlog, addLike } from "../reducers/blogReducer";

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const showWhenVisible = { display: detailsVisible ? "" : "none" };

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const addLike = ({ blog }) => {
    console.log(`updating likes for ${blog.id}`);
    updateBlog(blog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteBlog = ({ blog }) => {
    const blogToRemove = { ...blog };
    removeBlog(blogToRemove);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility} id="viewbutton">
          {detailsVisible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => addLike({ blog })}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {currentUser.username === blog.user.username ? (
          <button onClick={() => deleteBlog({ blog })}>remove</button>
        ) : null}
      </div>
    </div>
  );
};

const Blogs = ({ blogs, user }) => {
  const dispatch = useDispatch();

  if (user) {
    return (
      <div>
        {[...blogs]
          .sort(function (a, b) {
            return b.likes - a.likes;
          })
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={() => dispatch(addLike(blog))}
              removeBlog={() => dispatch(destroyBlog(blog))}
              currentUser={user}
            />
          ))}
      </div>
    );
  }
  return null;
};

export default Blogs;
