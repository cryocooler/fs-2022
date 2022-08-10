import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { createNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const id = action.payload.id;
      const delBlog = state.find((b) => b.id === id);
      return state.filter((b) => b.id !== delBlog.id);
    },
    likeBlog(state, action) {
      const id = action.payload.id;
      const blogToVote = state.find((b) => b.id === id);
      const tempBlog = {
        ...blogToVote,
        likes: blogToVote.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : tempBlog));
    },
    // commentBlog(state, action) {
    //   console.log("reducer action", action);
    //   const id = action.payload.id;
    //   console.log("id", id);
    //   const blogToComment = state.find((b) => b.id === id);
    //   const tempBlog = {
    //     ...blogToComment,
    //     comments: blogToComment.comments.concat(action.payload.comment),
    //   };
    //   return state.map((blog) => (blog.id !== id ? blog : tempBlog));
    // },
  },
});

export const { appendBlog, setBlogs, deleteBlog, likeBlog, commentBlog } =
  blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    //console.log(blogs);
    dispatch(setBlogs(blogs));
  };
};
export const createBlog = (blogObject) => {
  //console.log("reducer creating", blogObject);
  return async (dispatch) => {
    try {
      await blogService.create(blogObject);
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
      dispatch(
        createNotification(`added blog ${blogObject.title}`, 3, "success")
      );
    } catch (error) {
      dispatch(createNotification("Failed to create blog", 3, "error"));
    }
  };
};

export const addLike = (blogObject) => {
  return async (dispatch) => {
    const updateBlog = await blogService.update(blogObject);
    dispatch(likeBlog(blogObject));
    return updateBlog;
  };
};

export const addComment = (blogObject, comment) => {
  // console.log("reducer blogobject", blogObject);
  // console.log("reducer", comment);
  return async (dispatch) => {
    const updateBlog = await blogService.updateComment(blogObject, comment);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
    return updateBlog;
  };
};

export const destroyBlog = (blogObject) => {
  return async (dispatch) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      console.log(`removing blog with ID ${blogObject.id}`);
      {
        try {
          await blogService.remove(blogObject);
          dispatch(deleteBlog(blogObject));
          dispatch(
            createNotification(
              `${blogObject.title} succesfully deleted`,
              3,
              "success"
            )
          );
        } catch (exception) {
          dispatch(createNotification("Failed to delete blog", 3, "error"));
        }
      }
    }
  };
};
