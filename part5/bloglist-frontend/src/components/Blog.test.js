import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

test("renders content", () => {
  const currentUser = {
    username: "Neo",
  };
  const blog = {
    title: "Testing 101",
    author: "TestLord",
    url: "www.test.gov",
    likes: 999,
    user: {
      username: "Neo",
    },
  };

  render(<Blog blog={blog} currentUser={currentUser} />);

  const element = screen.getByText("Testing 101 TestLord");
  expect(element).toBeDefined();
});

test("renders details when button is clicked", async () => {
  const currentUser = {
    username: "Neo",
  };
  const blog = {
    title: "Testing 101",
    author: "TestLord",
    url: "www.test.gov",
    likes: 999,
    user: {
      username: "Neo",
    },
  };

  render(<Blog blog={blog} currentUser={currentUser} />);
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  const url = screen.getByText("www.test.gov");
  expect(url).toBeDefined();
  const likes = screen.getByText("likes 999");
  expect(likes).toBeDefined();
});

test("likes is called twice when clicked twice", async () => {
  const currentUser = {
    username: "Neo",
  };
  const blog = {
    title: "Testing 101",
    author: "TestLord",
    url: "www.test.gov",
    likes: 999,
    user: {
      username: "Neo",
    },
  };

  const mockHandler = jest.fn();

  render(
    <Blog blog={blog} currentUser={currentUser} updateBlog={mockHandler} />
  );
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
