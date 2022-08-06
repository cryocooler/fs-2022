import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ user, createBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    console.log("TRYING TO ADD BLOG");
    event.preventDefault();
    const newBlog = {
      author: author,
      title: title,
      url: url,
    };
    createBlog(newBlog);

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  if (user) {
    return (
      <div className="FormDiv">
        <h2>create new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="write here title text"
              id="titleinput"
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="write here author text"
              id="authorinput"
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder="write here url text"
              id="urlinput"
            />
          </div>
          <button type="submit" id="createbutton">
            create
          </button>
        </form>
      </div>
    );
  }
  return null;
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
