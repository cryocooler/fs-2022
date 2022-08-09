import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLike } from "../reducers/blogReducer";
import { addComment } from "../reducers/blogReducer";
import {
  IconButton,
  Typography,
  TextField,
  Button,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useState } from "react";

const Blog = ({ blogs }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.filter((b) => b.id === id);
  if (blogs.length === 0) {
    return null;
  }

  // const commentStyle = {
  //   paddingLeft: 20,
  // };

  const handleComment = async (event) => {
    event.preventDefault();
    // console.log("comment in Blog component ", comment);
    dispatch(addComment(blog[0], comment));
    setComment("");
  };
  return (
    <div>
      <Typography variant="h4">{blog[0].title}</Typography>
      <Typography>
        <a href="${blog.url}">{blog[0].url} </a>
      </Typography>
      <Typography>{blog[0].likes} likes </Typography>
      <IconButton
        size="small"
        aria-label="like"
        variant="contained"
        label="Like"
        color="success"
        onClick={() => dispatch(addLike(blog[0]))}
      >
        <ThumbUpIcon />
      </IconButton>

      <Typography>added by {blog[0].user.name}</Typography>
      <br></br>
      <Typography>
        <b>comments</b>
      </Typography>
      <br></br>
      <form onSubmit={handleComment}>
        <TextField
          label="Comment"
          size="small"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="contained" type="submit">
          add comment
        </Button>
      </form>
      <br></br>
      <div>
        {blog[0].comments.map((c, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <InfoIcon></InfoIcon>
            </ListItemIcon>
            <Typography>{c}</Typography>
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default Blog;
