import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";

test("BlogForm calls creation with right details", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);
  const titleInput = screen.getByPlaceholderText("title text", {
    exact: false,
  });
  const authorInput = screen.getByPlaceholderText("author text", {
    exact: false,
  });
  const urlInput = screen.getByPlaceholderText("url text", { exact: false });
  const submitButton = screen.getAllByText("create");
  console.log(submitButton);

  await user.type(titleInput, "Moria");
  await user.type(authorInput, "Gandalf");
  await user.type(urlInput, "www.middlearth.com");

  await user.click(submitButton[0]);
  //   console.log("NUMBER OF FOUND BUTTONS", submitButton.length);
  //   console.log("CALLED CONTENT", createBlog.mock.lastCall);
  //   console.log("MOCK CONTENT", createBlog.mock);
  //   console.log(createBlog.mock.calls[0][0]);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].author).toBe("Gandalf");
  expect(createBlog.mock.calls[0][0].title).toBe("Moria");
  expect(createBlog.mock.calls[0][0].url).toBe("www.middlearth.com");
});
