import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const user = useSelector((state) => state.login);

  const addBlog = async (event) => {
    //console.log("TRYING TO ADD BLOG");
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
        <form onSubmit={addBlog}>
          <div>
            <TextField
              size="small"
              type="text"
              label="Title"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="write here title text"
              id="titleinput"
            />
          </div>
          <div>
            <TextField
              size="small"
              type="text"
              value={author}
              label="Author"
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="write here author text"
              id="authorinput"
            />
          </div>
          <div>
            <TextField
              size="small"
              type="text"
              label="URL"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder="write here url text"
              id="urlinput"
            />
          </div>
          <Button variant="contained" type="submit" id="createbutton">
            create
          </Button>
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
