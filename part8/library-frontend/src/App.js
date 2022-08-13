import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {
  ADD_BOOK,
  ALL_AUTHORS,
  ALL_BOOKS,
  EDIT_BORN,
  LOGIN,
  ME,
} from "./queries/queries";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const books = useQuery(ALL_BOOKS);
  const [queryBooks, setQueryBooks] = useState([]);
  const authors = useQuery(ALL_AUTHORS);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const user = useQuery(ME);

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  const [authorChangeHandler] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [bookCreationHandler] = useMutation(
    ADD_BOOK,
    {
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    },
    {
      onError: (error) => {
        console.log("ERROR");
      },
    }
  );

  useEffect(() => {
    console.log("setting books", books);
    setQueryBooks(books);
  }, [books.data]);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      console.log("token exists", token !== null);
    }
  }, [result.data]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token === null ? null : (
          <button onClick={() => setPage("add")}>add book</button>
        )}
        {token === null ? null : (
          <button onClick={() => setPage("recommendations")}>
            recommendations
          </button>
        )}
        {token === null ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      <Authors
        editQuery={authorChangeHandler}
        authors={authors}
        show={page === "authors"}
        token={token}
      />

      <Books books={queryBooks} show={page === "books"} />
      <LoginForm login={login} setToken={setToken} show={page === "login"} />
      <NewBook creationQuery={bookCreationHandler} show={page === "add"} />
      <Recommend
        books={queryBooks}
        user={user}
        show={page === "recommendations"}
      />
    </div>
  );
};

export default App;
