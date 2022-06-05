import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [likes, setLikes] = useState("");
  const [deleteVisible, setDeleteVisible] = useState(false);

  const hideWhenVisible = { display: detailsVisible ? "none" : "" };
  const showWhenVisible = { display: detailsVisible ? "" : "none" };

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const addLike = ({ blog }) => {
    setLikes(blog.likes);
    console.log(`updating likes for ${blog.id}`);
    const blogToUpdate = { ...blog, likes: blog.likes + 1 };
    updateBlog(blogToUpdate);
    setLikes(blog.likes + 1);
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
        <button onClick={toggleVisibility}>
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

  /* <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
        <button onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => addLike({ blog })}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button>remove</button>
      </div>
    </div> */
};

export default Blog;
