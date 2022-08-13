import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, EDIT_BORN } from "./queries/queries";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const books = useQuery(ALL_BOOKS);
  const [queryBooks, setQueryBooks] = useState([]);
  const authors = useQuery(ALL_AUTHORS);
  const [token, setToken] = useState(null);

  const [authorChangeHandler] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const bookCreationHandler = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });

  useEffect(() => {
    console.log("setting books", books);
    setQueryBooks(books);
  }, [books.data]);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token === null ? null : (
          <button onClick={() => setPage("add")}>add book</button>
        )}
        <button onClick={() => setPage("login")}>login</button>
      </div>

      <Authors
        editQuery={authorChangeHandler}
        authors={authors}
        show={page === "authors"}
        token={token}
      />

      <Books books={queryBooks} show={page === "books"} />
      <LoginForm show={page === "login"} />
      <NewBook creationQuery={bookCreationHandler} show={page === "add"} />
    </div>
  );
};

export default App;
